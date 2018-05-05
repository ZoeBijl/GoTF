class GoTF {
    constructor(element) {
        this.element = element
        this.main = document.getElementsByTagName('main')[0]

        this.getData()
    }

    getData() {
        fetch('gotStats.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.data = data
                //this.generateDays(data)
            })
            .catch(error => {
                throw new Error(error)
            })
    }

    generateDays(data) {
        this.dates = Object.keys(data.dates)
        console.log(this.dates)

        this.dates.forEach(this.createDay.bind(this))
    }
	
    createDay(headingText) {
        const heading = document.createElement('h2')
        heading.innerHTML = headingText
        this.main.appendChild(heading)

        const table = document.createElement('table')
        const tr = document.createElement('tr')
		const tr2 = document.createElement('tr')
        const th = document.createElement('th')
        const th2 = document.createElement('th')
        th2.innerHTML = 'Messages'		

        tr.appendChild(th)
		tr.appendChild(th2)
		
		table.appendChild(tr)
		table.appendChild(tr2)
		
		var users = this.data.dates[headingText]		
		
		var sorted = [];
		
		for (var user in users) {
			sorted.push([user, users[user]]);
		}
		
		sorted.sort(function(a,b) {
			return b[1] - a[1];
		});
		
		var i
		
		for (i = 0 ; i < sorted.length ; i++)
		{
			const l_tr = document.createElement('tr')
			const td = document.createElement('td')
			const td2 = document.createElement('td')
			
			td.innerHTML = this.data.users[sorted[i][0]]
			td2.innerHTML =  sorted[i][1]
			l_tr.appendChild(td)
			l_tr.appendChild(td2)
			table.appendChild(l_tr)
		}
		
	/*	for (var user in users) {
			console.log(user)
			console.log(sorted[user])
			const l_tr = document.createElement('tr')
			const td = document.createElement('td')
			const td2 = document.createElement('td')
			td.innerHTML = this.data.users[user]
			td2.innerHTML = users[user]
			l_tr.appendChild(td)
			l_tr.appendChild(td2)
			table.appendChild(l_tr)

			//sorted.push([user, users[user]]);
		}*/
		


        this.main.appendChild(table)

    }
}

new GoTF(document.getElementsByTagName('body')[0])
