import VisitorVisit from "../model/visitor.js";

export const track = async (req, res) => {
  try {
    const { sessionId, page } = req.body;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: "sessionId is required" });
    }
    const visitDate = new Date().toISOString().slice(0, 10);
    await VisitorVisit.updateOne(
      { sessionId, visitDate },
      { $setOnInsert: { sessionId, visitDate, page: page || "/", visitedAt: new Date() } },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Visit track error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getHourly = async (req, res) => {
  try {
    const now = new Date();
    const start = new Date(now);
    start.setHours(start.getHours() - 23, 0, 0, 0);

    const raw = await VisitorVisit.aggregate([
      { $match: { visitedAt: { $gte: start } } },
      {
        $group: {
          _id: { year: { $year: "$visitedAt" }, month: { $month: "$visitedAt" }, day: { $dayOfMonth: "$visitedAt" }, hour: { $hour: "$visitedAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 } }
    ]);

    const buckets = {};
    raw.forEach(r => { buckets[`${r._id.year}-${r._id.month}-${r._id.day}-${r._id.hour}`] = r.count; });

    const hourly = [];
    const cursor = new Date(start);
    for (let i = 0; i < 24; i++) {
      const key = `${cursor.getFullYear()}-${cursor.getMonth() + 1}-${cursor.getDate()}-${cursor.getHours()}`;
      hourly.push({ name: `${String(cursor.getHours()).padStart(2, "0")}:00`, visitors: buckets[key] || 0 });
      cursor.setHours(cursor.getHours() + 1);
    }

    res.json({ success: true, data: hourly });
  } catch (err) {
    console.error("Visitor hourly error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTrend = async (req, res) => {
  try {
    const now = new Date();

    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    const weeklyRaw = await VisitorVisit.aggregate([
      { $match: { visitedAt: { $gte: weekStart } } },
      { $group: { _id: { $dayOfWeek: "$visitedAt" }, count: { $sum: 1 } } }
    ]);

    const countByDow = {};
    weeklyRaw.forEach(r => { countByDow[r._id] = r.count; });

    const dowMap = { 2: "Mon", 3: "Tue", 4: "Wed", 5: "Thu", 6: "Fri", 7: "Sat", 1: "Sun" };
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekly = dayOrder.map(name => {
      const dow = Object.entries(dowMap).find(([, v]) => v === name)?.[0];
      return { name, visitors: countByDow[parseInt(dow)] || 0 };
    });

    const monthStart = new Date(now);
    monthStart.setDate(monthStart.getDate() - 27);
    monthStart.setHours(0, 0, 0, 0);

    const monthlyRaw = await VisitorVisit.aggregate([
      { $match: { visitedAt: { $gte: monthStart } } },
      { $sort: { visitedAt: 1 } }
    ]);

    const weekCounts = [0, 0, 0, 0];
    monthlyRaw.forEach(v => {
      const daysAgo = Math.floor((now - v.visitedAt) / (24 * 60 * 60 * 1000));
      if (daysAgo <= 6) weekCounts[3]++;
      else if (daysAgo <= 13) weekCounts[2]++;
      else if (daysAgo <= 20) weekCounts[1]++;
      else weekCounts[0]++;
    });

    const monthly = [
      { name: "Week 1", visitors: weekCounts[0] },
      { name: "Week 2", visitors: weekCounts[1] },
      { name: "Week 3", visitors: weekCounts[2] },
      { name: "Week 4", visitors: weekCounts[3] }
    ];

    res.json({ success: true, data: { weekly, monthly } });
  } catch (err) {
    console.error("Visitor trend error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
