import express from 'express'            //Import section
import * as dotenv from 'dotenv'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import {convertHourToMinutes} from './utils/convert-hour-to-minutes'
import {convertMinutesToHour} from './utils/convert-minutes-to-hour'


const app = express();
dotenv.config();                  // Basic config section
const port = process.env.PORT;
const prisma = new PrismaClient({
    log: ['query']
});

app.use(express.json())
app.use(cors())

// Routes section
app.get("/ads/:id", async (req, res) => {
    
    const gameID = req.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            useVoiceChannel: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId: gameID
        },
        orderBy: {
            createdAt: 'desc',
        }
    })
    

    return res.status(200).json(ads.map(ad => {
        return {
            ...ad, weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHour(ad.hourStart),
            hourEnd: convertMinutesToHour(ad.hourEnd)
        }
    }))

    
})

app.get("/games", async (req, res) => {
    
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })
    
    return res.status(200).json(games)
})

app.get("/games/:id", (req, res) => {
    return res.status(200).json(req.params.id)
})

app.get("/ads/:id/discord", async (req, res) => {
    
    const adID = req.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adID
        }
    })    

    return res.status(200).json({
        discord: ad.discord
    })

})

app.post("/games/:id/ads", async(req, res) => {

    const gameID = req.params.id;
    const body = req.body;
    const ad = await prisma.ad.create({
        data: {
            gameId: gameID,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourToMinutes(body.hourStart),
            hourEnd: convertHourToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel

        }
    })


    return res.status(201).json(ad)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})