import fs from "fs";
import fetch from "node-fetch";

const ICS_URL = "https://ical.schedulestar.com/iCal_NOW.cfm?i=3D754529-E9FD-403D-B30214A6512009A0";
const OUTPUT_FILE = "schedule.ics"; // you can rename this

async function downloadICS() {
  try {
    const res = await fetch(ICS_URL, { timeout: 30000 });

    if (!res.ok) {
      throw new Error(`Failed to fetch ICS: ${res.status} ${res.statusText}`);
    }

    const data = await res.text();
    fs.writeFileSync(OUTPUT_FILE, data, "utf8");

    console.log(`✅ Saved latest ICS to ${OUTPUT_FILE} (${data.length} bytes)`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}

downloadICS();