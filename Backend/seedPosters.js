import mongoose from "mongoose";
import dotenv from "dotenv";
import Poster from "./model/poster.js";

dotenv.config();

const posters = [
  {
    image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/542398220_1463814817997034_3353356025581005088_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHlKGPZE6QS8kooYTK8ERG3vQkC9S_ZKIO9CQL1L9kog65ylGwkwpP1XXpLfHqWd3gq39ze_GCtaNKaKlOjVAK7&_nc_ohc=Ug5paD4mgCsQ7kNvwHq5ctM&_nc_oc=Adr7BqnXi-zSg0zpec01G-zjnT9jBtpA3evJP0e5EaIt7DQ0Sl-SL-5lYjjHY7criJc&_nc_zt=23&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=PakLExsmp6OHXOeJHRCVOw&_nc_ss=7b2a8&oh=00_Af67gQf0iltjhfa1uF_smcscz4pr56yQiwYM9ZfnNqewuw&oe=6A0DD24E",
    link: "https://www.facebook.com/IntersysSolutions/posts/pfbid06p9f9RFiXFo7Ry1WdqU3oparMRSyoiSSseijFGucuELYA3En1gQLQkFz8gdPbMp7l?rdid=288qEcMIhA3tD3JR#",
    order: 1
  },
  {
    image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/539841401_1460748051637044_7779269580864098264_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE5qTgW46Wj3Mo1yFWSdDuaDPjK-Oa12N0M-Mr45rXY3a2ogqCrnJmv50K9KHf5QkEYC4NcYF58Qr-KU1k9l4HK&_nc_ohc=dv2-YcAr6nAQ7kNvwGbrTdn&_nc_oc=Ado_ZOVjuglFQhE7x_Ot4f7-ZKOcZgPn5Q6ALKOL_ljY_bU5kqL98uqV8t8_Y_QTwRU&_nc_zt=23&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=oUeoymWsHSGORCKAeZQK4w&_nc_ss=7b2a8&oh=00_Af7nNPDTRUCZ4Gp7Ouh2YY6hhT-7xlgiTEbxXDVsFeqZcw&oe=6A0DAF92",
    link: "https://www.facebook.com/IntersysSolutions/posts/pfbid0eCFEQKJka5DRktVaqU9mfFC32oq8NEXJiy5iSxAhWV9ywSEJp4ZFGatrH9azjRSKl?rdid=PVUlGtZxjGKzhgYG#",
    order: 2
  },
  {
    image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/536278033_1454533932258456_4502023661893508967_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfzUlvWXkCBmspV6cWYsOwnsZvEsg6Rdyexm8SyDpF3BvxyhxVWTwD5KnbUxRw3EIQMZmyOK5DN6DiXr6uLohJ&_nc_ohc=SmUx-qKN_uwQ7kNvwGCd95g&_nc_oc=Adrc5mFFrIfog-tTGTNpDgq63Mo-j6zAuzK_KGsekIwaQ8KI2m3ZM79SEg1JlIA6hiY&_nc_zt=23&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=PSh27K_nAThzKll925H_AQ&_nc_ss=7b2a8&oh=00_Af4Oh4-GvHbt8JXjmDTHtrsFaj2x0OKIh1CKX7qjjmKD_Q&oe=6A0DAB09",
    link: "https://www.facebook.com/IntersysSolutions/posts/pfbid02zpeBZKXdRjkfUrmqMQd1NW6dfyy4UpvcEhZMaUWfk5Vxe6jCMbLtQetqsgE28FGql?rdid=VbFSh3qAHof0Hl6U#",
    order: 3
  },
  {
    image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/546893391_1470200450691804_7085806732702827255_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEl4R3t_aELIJ-BCi3gUQFV_ehMWOSZknD96ExY5JmScNs9iYdSGiN-qZ1VTLCo-lXjX74HQyuD6t4XjMR6902L&_nc_ohc=NApxHbNuH7QQ7kNvwFVzu4w&_nc_oc=Adq4rt4T_0ayTI0xr2gBKBKuGdXIcS_zVXMjeII9s-a9YAwKDpd1iK1Ka6-p4L-5crs&_nc_zt=23&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=uDinJXQLqR1IswWBaKoEEg&_nc_ss=7b2a8&oh=00_Af5dRme2orag7Qx4wsI018mM7mC9-W1rCXaM--OgjakUww&oe=6A0DD106",
    link: "https://www.facebook.com/IntersysSolutions/posts/pfbid0KCKGUAPfUpQUs7FWH2bYX9jnWfJ6njKtzgJLDzuwsfN4rVvvT5uTJWi2q8r3fA9Yl?rdid=op2J1cGAvEwtFIhZ#",
    order: 4
  },
  {
    image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/548892210_1474303960281453_35818430066383983_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFzleOUcERf-5N5-1UMzsrb7D4QUsobDebsPhBSyhsN5vAjBGOiCCcT7KnPv6BFt292qjcSipRRi3ySgRxGaqDZ&_nc_ohc=5dSwFHXInpoQ7kNvwGXLC89&_nc_oc=Adp_GUAFseBIC1RoYY6SWjXHkzlDWUHXBv6g9BcktWfc8jc0HHZ6ZLZhSM6xxIq80gk&_nc_zt=23&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=ap7JE1v94UmeNCdl6V_zvg&_nc_ss=7b2a8&oh=00_Af64p3kDFioP4VZIi96LtCQyq3HiIVCun5Fi1tudz8C9TQ&oe=6A0DC7DA",
    link: "https://www.facebook.com/share/p/1AzkC5TcDi/",
    order: 5
  },
  {
    image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/548892210_1474303960281453_35818430066383983_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFzleOUcERf-5N5-1UMzsrb7D4QUsobDebsPhBSyhsN5vAjBGOiCCcT7KnPv6BFt292qjcSipRRi3ySgRxGaqDZ&_nc_ohc=5dSwFHXInpoQ7kNvwGXLC89&_nc_oc=Adp_GUAFseBIC1RoYY6SWjXHkzlDWUHXBv6g9BcktWfc8jc0HHZ6ZLZhSM6xxIq80gk&_nc_zt=23&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=ap7JE1v94UmeNCdl6V_zvg&_nc_ss=7b2a8&oh=00_Af64p3kDFioP4VZIi96LtCQyq3HiIVCun5Fi1tudz8C9TQ&oe=6A0DC7DA",
    link: "https://www.facebook.com/share/p/1AzkC5TcDi/",
    order: 6
  },
  {
    image: "https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/708168962_1679430116435502_6878553064290167276_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHW13tAoEM5InkxyUK_5ZVPUdpjrhmP-MhR2mOuGY_4yOL61a7cqysVD2TvrxFbaak8LhdMwom_B3UlBCu_BSy7&_nc_ohc=Kv-4Ykwu-pgQ7kNvwHwnMGf&_nc_oc=AdpeG0iBqMlwjReDa3U74glHqp6DyOzr32gpYSX8v-zSBp4B6rDlS1aIPLDG1yosGsw&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=qqJb8jgSSYDVU49z25-ECA&_nc_ss=7b2a8&oh=00_Af7HBpxDe628zKlaPDzOZ9hR1pZQuofk7FeLPrv9pxworQ&oe=6A1C36F5",
    link: "https://www.facebook.com/share/p/18YKhV5YmG/",
    order: 7
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
