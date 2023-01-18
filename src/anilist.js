const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch')

//require('dotenv').config();

const token = "1617942474:AAHnkhLPK25XGT6L_i9n489p9FRn0Q45cRc";

const bot = new TelegramBot(token, { polling: true});



bot.on('message', (msg) => {
const chatId = msg.chat.id;
if (msg.text === '/start') {
    bot.sendPhoto(chatId, 'https://cdn.vox-cdn.com/thumbor/BKMlgrrrFzcuuY-zjbBxOrNYrvI=/0x0:3000x2000/1820x1024/filters:focal(1260x760:1740x1240):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70507103/jbareham_220211_ecl1072_valentines_anime_0001.0.jpg', {
        caption: 'Welcome to our anime bot! Here you can discover new anime, get information about your favorite shows, and keep up to date with the latest episodes. Start exploring the world of anime today!"\n\n Just enter the name of the anime you want to search for.', 
        parse_mode: 'HTML', 
        
    });

}

else{
    
    anime(msg.text).then((data) => {
    
        //access the description from the query without br tags and only with one paragraph
        
        var description = data['data']['Media']['description'].replace(/<br>/g, '\n').split('\n')[0];
        //endate check if null if yes return empyt otherwise return date
        var enddate = data['data']['Media']['endDate']['year'] == null ? '' : data['data']['Media']['endDate']['year'] + '-' + data['data']['Media']['endDate']['month'] + '-' + data['data']['Media']['endDate']['day'];



        
        
       

    msg_txt = '<strong >'+data['data']['Media']['title']['english']+'</strong>' +
            '(' +  data['data']['Media']['title']['native'] + ')\n \n'+
            '<b>Episodes:</b>  ' + data['data']['Media']['episodes'] + '\n \n'+
            '<b>Duration:</b>  ' + data['data']['Media']['duration'] + '\n \n'+
            '<b>Status:</b>  ' + data['data']['Media']['status'] + '\n \n'+
            '<b>Genres:</b>  ' + data['data']['Media']['genres'] + '\n \n'+
            '<b>Score:</b>  ' + data['data']['Media']['averageScore'] + '\n \n'+
            '<b>Popularity:</b>  ' + data['data']['Media']['popularity'] + '\n \n'+
            '<b>Start Date:</b>  ' + data['data']['Media']['startDate']['year'] + '-' + data['data']['Media']['startDate']['month'] + '-' + data['data']['Media']['startDate']['day'] + '\n \n'+
            '<b>End Date:</b>  ' + enddate + '\n \n'+
            //'<b>Studios:</b>  ' + data['data']['Media']['studios']['nodes'][0]['name'] + '\n \n'+
            '<b>Description:</b>  ' + description
            
     


        bot.sendPhoto(chatId, "https://img.anili.st/media/"+data['data']['Media']['id'], {
            caption: msg_txt, 
            parse_mode: 'HTML', 
            reply_markup: {
                inline_keyboard: [

                    [{text: 'More', url: data['data']['Media']['siteUrl']}],
                    
                    
                ]

            },
            
        });


 });  

}

    


});



async function anime(id) {

    var variables = {
        search: id
    };

    var query = `
    query ($id: Int,$search: String) { 
      Media (id: $id,search: $search, type: ANIME) { 
        id
        title {
          romaji
          english
          native
          
        }
    
        description
        episodes
        duration
        status
        genres
        averageScore
        popularity
        startDate {
            year
            month
            day
        }
        endDate {
            year
            month
            day

        }   
    
    
        studios(isMain: true) {
            nodes {
                name
            }
        }
    
    
        siteUrl
        trailer {
            id
            site
        }
    
        
    
        
    
    
        
      }
    }
    `;
    
    // Define our query variables and values that will be used in the query request

    
    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
    
    // Make the HTTP Api request
    const response = await fetch(url, options)
    const resData = response.json();
   
    return resData;
    
}


