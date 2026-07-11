/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { db } from "./src/server/db.js";
import { User } from "./src/types.js";

// Helper function to hash passwords securely using native crypto (no extra native libraries needed)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for standard JSON payloads, raised size limit for CSV file uploading
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ extended: true, limit: "20mb" }));

  // --- AUTHENTICATION API ENDPOINTS ---

  // User Signup
  app.post("/api/auth/signup", (req, res) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: "Missing required fields: email, password, name" });
      }

      const existingUser = db.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "A user with this email already exists" });
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        email: email.toLowerCase(),
        passwordHash: hashPassword(password),
        name: name.trim(),
        createdAt: new Date().toISOString()
      };

      db.addUser(newUser);

      // Create a simple token-based session payload
      const token = Buffer.from(JSON.stringify({ userId: newUser.id, email: newUser.email })).toString("base64");

      return res.status(201).json({
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        },
        token
      });
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ error: "An error occurred during signup" });
    }
  });

  // User Login
  app.post("/api/auth/login", (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }

      const user = db.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const hashedPassword = hashPassword(password);
      if (user.passwordHash !== hashedPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Create simple base64 token session payload
      const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString("base64");

      return res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "An error occurred during login" });
    }
  });

  // Get current auth session from header
  app.get("/api/auth/session", (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({ isAuthenticated: false, user: null });
      }

      const token = authHeader.split(" ")[1];
      const decodedStr = Buffer.from(token, "base64").toString("utf-8");
      const session = JSON.parse(decodedStr);

      const users = db.getUsers();
      const user = users.find(u => u.id === session.userId && u.email === session.email);

      if (!user) {
        return res.json({ isAuthenticated: false, user: null });
      }

      return res.json({
        isAuthenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (err) {
      // Return unauthenticated on any decryption/decoding failures
      return res.json({ isAuthenticated: false, user: null });
    }
  });

  // Mock logout
  app.post("/api/auth/logout", (req, res) => {
    return res.json({ success: true });
  });


  // --- COMMERCE DATA API ENDPOINTS ---

  // Get current orders list
  app.get("/api/orders", (req, res) => {
    return res.json({ orders: db.getOrders() });
  });

  // Update orders list (overwritten on CSV upload)
  app.post("/api/orders", (req, res) => {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ error: "Invalid orders payload, expected an array" });
    }
    db.saveOrders(orders);
    return res.json({ success: true, message: `${orders.length} orders successfully stored` });
  });

  // Get current inventory list
  app.get("/api/inventory", (req, res) => {
    return res.json({ inventory: db.getInventory() });
  });

  // Save current inventory list
  app.post("/api/inventory", (req, res) => {
    const { inventory } = req.body;
    if (!Array.isArray(inventory)) {
      return res.status(400).json({ error: "Invalid inventory payload, expected an array" });
    }
    db.saveInventory(inventory);
    return res.json({ success: true });
  });

  // Get AI insights
  app.get("/api/insights", (req, res) => {
    return res.json({ insights: db.getInsights() });
  });

  // Reset database endpoint
  app.post("/api/reset", (req, res) => {
    db.resetDB();
    return res.json({ success: true, orders: db.getOrders(), inventory: db.getInventory(), insights: null });
  });


  // --- VITE INTERFACE MIDDLEWARE ---

  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static client assets in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express + Vite Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
