const weeks = ['sun','mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const d = new Date();

let today = weeks[d.getDay()];

const makeRequest = async () =>{
    const request = await fetch('data.json');
    if(!request.ok) {
        throw new Error('HTTP ERROR, failed to fetch data', request.status);
    }
    const response = await request.json();
    return response;
}

makeRequest().then((datas) => {
    const days = [];
    const amounts = [];
    for(data of datas) {
        days.push(data['day']);
        amounts.push(data['amount']);
    }
    
    // chart components begins here 
    days.forEach((day) => {
        if(today === day) {
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: days,
                    datasets: [{
                        label: 'Spending - Last 7 days',
                        data: amounts ,
                        backgroundColor: [
                            'hsl(186, 34%, 40%)',
                        ],
                        borderRadius: 3,
                    }]
                }
            });
        } else {
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: days,
                    datasets: [{
                        label: '',
                        data: amounts ,
                        backgroundColor: [
                            'hsl(186, 34%, 60%)',
                        ],
                        borderRadius: 3,
                    }]
                }
            });
        }
    });

}).catch((error) => {
    console.error('something went wrong:', error);
});



