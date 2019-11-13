function getAPIData()
{
    try
    {
        var channelInfo = {};
        var feedInfo = [];
        var aListofAPICalls = ["https://api.thingspeak.com/channels/846341/feeds.json?api_key=7D11SNO8Z7VZDAXV&results=2", "https://api.thingspeak.com/channels/846343/feeds.json?api_key=FGCN8ZA49X7OHEC4&results=2", "https://api.thingspeak.com/channels/846344/feeds.json?api_key=2Q8WMYX0ZS5UJX9Z&results=2", "https://api.thingspeak.com/channels/838127/feeds.json?api_key=9461OWURBMV28WEE&results=2"];
        // For each API call do the following
        for(var i = 0; i < aListofAPICalls.length; i++)
        {
            var request = new XMLHttpRequest();
            // Open a new connection, using the GET request on the URL endpoint
            request.open('GET', aListofAPICalls[i], true);
            request.onreadystatechange = function() {
            // Begin accessing JSON data here
                if (this.readyState == 4 && this.status == 200) {
                    // Begin accessing JSON data here
                    var data = JSON.parse(this.response)
                    // Log each desks status
                    channelInfo = data.channel;
                    feedInfo = data.feeds;
                    if(channelInfo.last_entry_id > 0)
                    {
                        var isOccupied = feedInfo[feedInfo.length-1].field1;
                        if(feedInfo[feedInfo.length-1].entry_id == channelInfo.last_entry_id)
                        {
                            var deskID = channelInfo.id;
                            if(isOccupied < 51)
                            {
                                //change status to occupied
                                document.getElementById(deskID).innerHTML = "Occupied";
                            }else if(isOccupied == 51){
                                //change status to vacant
                                document.getElementById(deskID).innerHTML = "Vacant";       
                            }else{
                                //record invalid reading
                                document.getElementById(deskID).innerHTML = "Check Sensor";
                            }
                        }
                    }
                }
            };
            // Send request
            request.send();
        }
    }catch(e)
    {
        console.log(e);
    }
}