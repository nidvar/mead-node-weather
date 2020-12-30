console.log('learning node rules all!');

const output = document.getElementById('output')

const fetch_weather = (user_input)=>{
    fetch(`http://localhost:3000/weather?address=${user_input}`).then(a=>{
        return a.json();
    }).then(a=>{
        const data = a.results.body.current
        const data2 = a.results.body.location

        const results = []
        results.push(data.humidity, data.temperature, data.weather_descriptions, data2.country, data2. localtime)

        console.log(results)
        display_results(data.humidity, data.temperature, data.weather_descriptions, data2.country, data2. localtime)
    })
}

document.getElementById('user_input').addEventListener('keydown', (e)=>{
    if(e.keyCode==13){
        fetch_weather(e.target.value)
    }
})

const display_results = (humidity, temperature, weather_descriptions, country_name, locatime)=>{
    
    let results = [humidity, temperature, weather_descriptions, country_name, locatime]
    let results2 = ['humidity', 'temperature', 'weather descriptions', 'country_name', 'locatime']

    for(let i =0; i<=4; i++){
        const x = document.createElement('p')
        x.innerHTML = `<strong>${results2[i]}:</strong>  `+ results[i]
        output.appendChild(x)
    }

}