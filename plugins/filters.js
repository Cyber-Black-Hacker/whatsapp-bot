/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require("../Utilis/events")
const FilterDb = require("./sql/filters")
// const config = require('../config');
const Language = require("../language")
const { prepareFilter } = require("../Utilis/greetings")
const Lang = Language.getString("filters")
let fm = true
Asena.addCommand(
  { pattern: "filter ?(.*)", fromMe: fm, desc: Lang.FILTER_DESC },
  async (message, match) => {
    match = message.message.match(/[\'\"](.*?)[\'\"]/gms)
    if (match === null) {
      filtreler = await FilterDb.getFilter(message.jid)
      if (filtreler === false) {
        await message.sendMessage(Lang.NO_FILTER)
      } else {
        var mesaj = Lang.FILTERS + "\n"
        filtreler.map(
          (filter) => (mesaj += "```=> " + filter.dataValues.pattern + "```\n")
        )
        await message.sendMessage(mesaj)
      }
    } else {
      if (match.length < 2) {
        return await message.sendMessage(
          Lang.NEED_REPLY + " ```.filter 'sa' 'as'"
        )
      }
      await FilterDb.setFilter(
        message.jid,
        match[0].replace(/['"]+/g, ""),
        match[1].replace(/['"]+/g, ""),
        match[0][0] === "'" ? true : false
      )
      await message.sendMessage(
        Lang.FILTERED.format(match[0].replace(/['"]+/g, ""))
      )
    }
  }
)

Asena.addCommand(
  { pattern: "stop ?(.*)", fromMe: fm, desc: Lang.STOP_DESC },
  async (message, match) => {
    match = message.message.match(/[\'\"](.*?)[\'\"]/gms)
    if (match === null) {
      return await message.sendMessage(
        Lang.NEED_REPLY + "\n*Example:* ```.stop 'hello'```"
      )
    }

    del = await FilterDb.deleteFilter(
      message.jid,
      match[0].replace(/['"]+/g, "")
    )

    if (!del) {
      await message.sendMessage(Lang.ALREADY_NO_FILTER)
    } else {
      await message.sendMessage(Lang.DELETED)
    }
  }
)

Asena.addCommand({ on: "text", fromMe: false }, async (message, match) => {
  let filtreler = await FilterDb.getFilter(message.jid)
  if (!filtreler) return
  filtreler.map(async (filter) => {
    pattern = new RegExp(
      filter.dataValues.regex
        ? filter.dataValues.pattern
        : "\\b(" + filter.dataValues.pattern + ")\\b",
      "gm"
    )
    const array = ['alive','Aliya','Arjun','Aliyo','Lallu','alone','Xxxtentacion','Pm','Raju','Aktfa','Althaf','ano','ara','Ardra','ayilla','ayn','aysheri','Ayyo','baby','Back','bad boy','Bad','bgm','Bhasi','bie','big fan','Blackzue','Boss','bot','Bot','broken','brokenlove','Bye','care','Chathi','chatho','Chathy','Chetta','Chiri','Chunk','chunke','chunks','comedy','cr7','Cr7','Cristiano','Cry','da','Dai','DD','die','Dora','Eda','ee','ekk','Ellarum ede','ennitt','enth','Entha cheyya','entha','Enthada','evde','Fasil','Fan','fd','Feel aayi','Fek','ff','free','fresh','Frnd','Fsq','Gd mng','gd n8','Gd ngt','gdmng','gdngt','good bye','group','grp','Ha','hate','Haters','Hbd','Hbday','He','Hello','Hi','Hlo','Hloo','Hoi','Hy','i am back','ijathi','jd','kadhal','kali','Kanapi','Kanaran','Kanjan','Kanjav','kar98','Kemam','kenzo','Kenzoo','kerivaa','Kevin','Kgf','killadi','king','kiss','Kk','Koi','kozhi','Kukku','kundan','Kundan','Kunju','kunna','Kurup','Kutty','La be','Lala','left','Legend','Leopucha','life','line','Lo','Loo','Love tune','love u','Love','lover','Loveu','Lub u','lucifer','machan','Mad','Malang','mindalle','mindathe','Mohanlal','Mood','moodesh','moonji','Music pranthan','music','Muth','muthe','my area','My god','My love','mybos','mylove','myr','myre','Nalla kutty','Nallakutti','nallath','Name entha','Name','nanban','Nanbiye','Nanni','neymar','Neymer','Nirthada','nirthada','Nirtheda','Nishal','njan','Njn vera','njn','Njr','noob','Oh no','Oh','ok bei','Ok bye','ok da','ok','Ok','oombi','oompi','over','Paat','paatt','Paavam','padicho','pani','Panni','parayatte','patti','perfect ok','Pever','pewer','photo','Pinnallah','Place','Poda','Podai','Poli','polika','Pooda','poora','Poote','Pora','Potta','Potte','Power varate','power','Poweresh','Poyeda','Pranayam','Psycho','Ramos','rascal','rashmika','rasool','return','Rose','sad','Sad','Sahva','saji','Sayip','scene','Sed aayi','sed bgm','Sed tune','sed','Senior','Serious','set aano','Set','Seth po','Singapenne','single','sis','sketched','Smile','sneham','Soldier','song','sorry','Sry','Subscribe','Suhail','sulthan','Super','T','Tentacion','Thalapathy','thall','thamasha','Thantha','thayoli','theri','thot','thottu','thug','Thyr','Town','Track maat','trance','Uff','Umbi','umma','uyir','Va','Vaa','vada','Vava','Veeran','venda','verithanam','Vidhi','Wait','waiting','welcome','why','wow','Yaar','Z aayi','2','aara','Aarulle','adi','adima','Adipoli','breakup','Chunks','Clg','dance','Di','don','Ee','enjoy','Fen','Gd','Hacker','help','I love you','Kali','Kenzo','Kk gaming','KL LUTTAP 007','Kl luttapi 007','kozhi','lair','love','Men','Mm','myr','Myre','Nanbaa','nanban','Nirth','Njan vannu','Njan','No love','paatt','Penn','Pinnalla','poda','Pooda','prandh','putt','Rashmika','Rashu fans','Rashu','Ringtone','rip','Sarassu','Sarasu','Sed','Set aaka','Sfi','shibil','Single','sopnam','Tholvi','Uyr','Waiting','wcm','@917592997310','Araa','junaid','junu','morning','Junaid','Bajwa','funny','hi','Malik','Rizwan','Sad','Shabi','Shahzaib','Sho','Welcome']

array.map( async (a) => {

let pattern = new RegExp(`\\b${a}\\b`, 'g');

if(pattern.test(message.message)){

       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, duration: Config.SAID, quoted: message.data, ptt: true})

}

});
    if (pattern.test(message.message)) {
      let { msg, MessageType } = await prepareFilter(filter.dataValues.text)
      await message.sendMessage(
        msg,
        {
          quoted: message.data,
        },
        MessageType
      )
    }
  })
})
