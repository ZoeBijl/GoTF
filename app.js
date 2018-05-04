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
                this.generateDays(data)
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
        const th = document.createElement('th')
        const th2 = document.createElement('th')
        th2.innerHTML = 'Messages'
        tr.appendChild(th)
        tr.appendChild(th2)
        table.appendChild(tr)

        const users = this.data.dates
        console.log(users)



        this.main.appendChild(table)

    }
}

new GoTF(document.getElementsByTagName('body')[0])
