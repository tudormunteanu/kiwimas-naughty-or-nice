export default {
    async fetch(request, env) {
        if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 })
        }

        const data = await request.json()
        const { fid } = data.untrustedData

        const isNaughty = fid % 2 === 0
        console.log("================", fid, isNaughty)

        const now = Math.floor(Date.now() / 1000);

        const confirmNaughty = `https://warpcast.com/~/compose?text=${encodeURIComponent(`I'm on the naughty list and that's fine. Where's my coal, @[tag a friend]! https://kiwimas.com/frame/`)}`

        const confirmNice = `https://warpcast.com/~/compose?text=${encodeURIComponent(`I'm on the nice list and that's fine. Where's my $kiwimas, @[tag a friend]! https://kiwimas.com/frame/`)}`

        const switchToNaughty = `https://warpcast.com/~/compose?text=${encodeURIComponent(`Oh no, I'm on the naughty list. Save me @[tag a friend]! https://kiwimas.com/frame/`)}`

        const switchToNice = `https://warpcast.com/~/compose?text=${encodeURIComponent(`Oh no, I'm on the nice list. Save me @[tag a friend]! https://kiwimas.com/frame/`)}`

        return new Response(
            `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Kiwimas Naughty or Nice</title>
                <meta property="fc:frame" content="vNext">
                <meta property="fc:frame:image" content="https://kiwimas.com/media/${isNaughty ? 'naughty' : 'nice'}.png?version=${now}">
                
                <meta property="fc:frame:button:1" content="${isNaughty ? 'confirm naughty 😈' : 'confirm nice 😇'}">
                <meta property="fc:frame:button:1:action" content="link">
                <meta property="fc:frame:button:1:target" content="${isNaughty ? confirmNaughty : confirmNice}">
                
                <meta property="fc:frame:button:2" content="${isNaughty ? 'switch to nice 😇' : 'switch to naughty 😈'}">
                <meta property="fc:frame:button:2:action" content="link">
                <meta property="fc:frame:button:2:target" content="${isNaughty ? switchToNice : switchToNaughty}">

                <meta property="fc:frame:button:3" content="what's $kiwimas?">
                <meta property="fc:frame:button:3:action" content="link">
                <meta property="fc:frame:button:3:target" content="https://kiwimas.com">
            </head>
            </html>
            `,
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            }
        )
    }
}