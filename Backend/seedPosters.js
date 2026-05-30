import mongoose from "mongoose";
import dotenv from "dotenv";
import Poster from "./model/poster.js";

dotenv.config();

const posters = [
  {
    image: "https://scontent.fpnh18-4.fna.fbcdn.net/v/t39.30808-6/708168962_1679430116435502_6878553064290167276_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHW13tAoEM5InkxyUK_5ZVPUdpjrhmP-MhR2mOuGY_4yOL61a7cqysVD2TvrxFbaak8LhdMwom_B3UlBCu_BSy7&_nc_ohc=Kv-4Ykwu-pgQ7kNvwEBoC37&_nc_oc=AdrAo0KysHW5RGgRmD1tDmxOCwad7hm3XLBKG_iElV9DjWrQAJL-peiEecVd7ToyK6A&_nc_zt=23&_nc_ht=scontent.fpnh18-4.fna&_nc_gid=56AIQt4M32ZD-oDaqGOvVQ&_nc_ss=7b2a8&oh=00_Af6ZLn36hMsjYDUnu46p-A4CXGuMgGVk3JX6rF4IhAPz0A&oe=6A1F82B5",
    link: "https://web.facebook.com/share/p/17pnduvHxH/",
    order: 1
  },
  {
    image: "https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/702273500_1673656103679570_6365624083047398662_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGzmM7FGu5nPuOHokZEyji5ooGMzlqsDtKigYzOWqwO0nV8ct1WvSGYoOWVrGn6lppFOh_QBAxdtUP87drzPalE&_nc_ohc=OObaVYSDgTMQ7kNvwEUoYcH&_nc_oc=AdoB3sxOf2VtexqyXO0fiy4oc4ycYUNTGI8aXAmruOG13trBpWFNqjH93Fc67ygjmjQ&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&_nc_gid=ktRKxy8A7u85xyYGS6FHYA&_nc_ss=7b2a8&oh=00_Af6Ek-FeHRsK_dFjlidj0s6qiyWK0Y4io312gSUjkEx0VQ&oe=6A1F7D19",
    link: "https://web.facebook.com/share/p/1GwdYjegnY/",
    order: 2
  },
  {
    image: "https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/698706311_1669464884098692_2560361955301028836_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE8QWQuqdZ9WPOxMVwsZjElEfbmqsOX8zcR9uaqw5fzN-QRgd8F5D9Zt4Ro5o4A2OsGHJ9uXez9gN3GKijG9Syc&_nc_ohc=jcMI3CutrhcQ7kNvwGJrUKn&_nc_oc=AdofTmBtjW2dGxtCEZj-CgbyVa16wxMQ2KjcZhuRZd-POdCB0CAs0Rn0cwleA-QVs7k&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&_nc_gid=b-RzcBG_Eu5FJB8AT6Oxtw&_nc_ss=7b2a8&oh=00_Af7SGZlIWVOoO3vMza1y5_6ged77ZyCjER4SnfMb9RJb6g&oe=6A1F5BF8",
    link: "https://web.facebook.com/share/p/1Dk2WBmajo/",
    order: 3
  },
  {
    image: "https://scontent.fpnh18-6.fna.fbcdn.net/v/t39.30808-6/687429731_1663566861355161_7287976358721882227_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH0zaMZ3wnG10V5Xg0m9a1YChAN_qQ6dJ4KEA3-pDp0npiGwCqT97gr7a7GaKaU9V91MbXi4ZoLBA4nS3zEu_z-&_nc_ohc=kLs2PUK9x88Q7kNvwFKFe0e&_nc_oc=AdpcsMEuE7tm1covVEANHb81_HLWl6qv8cVXXCZhU2JXT0Y9pyXVtFe_cnSm0RFHmKY&_nc_zt=23&_nc_ht=scontent.fpnh18-6.fna&_nc_gid=95KOaSYimdchIjBvwgWtFw&_nc_ss=7b2a8&oh=00_Af46PNUJ37eYVN8lf2QvNtZHRDli9oCBOnFTN9tnfF786Q&oe=6A1F66C6",
    link: "https://web.facebook.com/share/p/1J1LFsLTMA/",
    order: 4
  },
  {
    image: "https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/684432355_1659032578475256_6458045240956930790_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEDLNxSvBSdRTL1xxK9U1PpQvbYds6nxGBC9th2zqfEYAvcPFpG4zXwKbgxwB_e_L704pYnv-NtgCrNW39K9OGj&_nc_ohc=kbOb1i4omDkQ7kNvwHqlhnh&_nc_oc=AdrahQVxGvUGR38GSNquCB8KQZyYi4eIgbFn-DTgJArK3XZ6lc06fJGmwPuc-kAK6Ig&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&_nc_gid=nJbjodqBJbkXUduAJoyoPQ&_nc_ss=7b2a8&oh=00_Af54PssY79Zjte3aNahyx3vQKh09LmFLDBSLBlj-tHW6Kw&oe=6A1F8993",
    link: "https://web.facebook.com/share/p/18jDkMYSJ9/",
    order: 5
  },
  {
    image: "https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/635288441_1600891627622685_6749069664326911412_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE9vv8KI7qabvdb_7-EHrz7T8STYkzGLu5PxJNiTMYu7mQGNZ3Sa9a7bclaraTJBppolRxd_I1935EXQj-EEoMu&_nc_ohc=m69LcMugN74Q7kNvwHsHltV&_nc_oc=AdoIZlleuIzxUM2x2Z7LR-iwUVkE_oJKuXH7u8plnjSsbtBfWgrbJkPGXxrZQBxczpI&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&_nc_gid=eIsbBTHHu-ML2WWq1EzWSQ&_nc_ss=7b2a8&oh=00_Af4E3qZi14oSaacV3Ngs_nOcqVUvdApkRELxkE7RzLYhQg&oe=6A1F8496",
    link: "https://web.facebook.com/share/p/1FzEVRRGeC/",
    order: 6
  },
  {
    image: "https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/615277555_1573686853676496_6305546670140149501_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHegCrtGdN4E9HvjZQcRvlwLx57x2iwqDMvHnvHaLCoM5WT1DBhRaenT2DZ9LQZPHBs1Xk6WLZTiKq0PCQflFAt&_nc_ohc=poxe7D5Trj8Q7kNvwHqRca5&_nc_oc=AdrUB4sUL73xLnr3UEuHutclw-2Gzfd7TEv2ELWEUbhJPDq8bfAjDdv6lwbz3-xy1N8&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&_nc_gid=RvSVEUCudDhPfGAl3mpSSQ&_nc_ss=7b2a8&oh=00_Af5v2kPDu_e1crufbyFg1JAMS3oJVdGlNv4tbnB-J5N94A&oe=6A1F6EA7",
    link: "https://web.facebook.com/share/p/18uNov7EWY/",
    order: 7
  },
  {
    image: "https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/702273500_1673656103679570_6365624083047398662_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGzmM7FGu5nPuOHokZEyji5ooGMzlqsDtKigYzOWqwO0nV8ct1WvSGYoOWVrGn6lppFOh_QBAxdtUP87drzPalE&_nc_ohc=OObaVYSDgTMQ7kNvwEUoYcH&_nc_oc=AdoB3sxOf2VtexqyXO0fiy4oc4ycYUNTGI8aXAmruOG13trBpWFNqjH93Fc67ygjmjQ&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&_nc_gid=WXRa_nhtUdyvJPDd0_iPlQ&_nc_ss=7b2a8&oh=00_Af5D5k-bMevOAlMXFy0WSnn-tKpuoF9kA6CPO434jqxHtw&oe=6A1CDA19",
    link: "https://web.facebook.com/share/p/178GRoSXHC/",
    order: 8
  },







];

async function seed() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB...");

    // Find existing posters to avoid duplicating emails
    const existingPosters = await Poster.find({});
    const existingLinks = new Set(existingPosters.map(p => p.link));

    let addedCount = 0;

    for (const poster of posters) {
      if (!existingLinks.has(poster.link)) {
        console.log(`\n✨ Found NEW poster! Adding and sending emails for: ${poster.link}`);

        // Use the API so the email logic is triggered!
        const response = await fetch("http://localhost:1000/api/posters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(poster)
        });

        const result = await response.json();
        if (result.success) {
          console.log(`✅ Success! Emails sent to ${result.notified} subscriber(s).`);
          addedCount++;
        } else {
          console.error(`❌ Failed to add poster:`, result.message);
        }
      } else {
        console.log(`⏩ Poster already exists, skipping: ${poster.link}`);
      }
    }

    console.log(`\n🎉 Finished checking posters! Added ${addedCount} new posters.`);
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
