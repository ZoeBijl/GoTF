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
                this.dates = data.dates
                this.users = this.generateUsers(data.users)
                // this.generateDays()
                this.generateTotals()
                this.printTotals()
            })
            .catch(error => {
                throw new Error(error)
            })
    }

    generateUsers(users) {
        var usersArr = []
        Object.keys(users).forEach(function(user){
            // usersArr.push({id: user, name: users[user], count: 0})
            usersArr.push(new GoTFUser(user, users[user]))
        })
        return usersArr
    }

    generateTotals() {
        this.totalMessages = 0
        Object.keys(this.dates).forEach(function(date){
            Object.keys(this.dates[date]).forEach(function(userid){
                var user = this.users.find(function(user) {return user.id == userid})
                user.addMessagePerDate(date, this.dates[date][userid])
                this.totalMessages += this.dates[date][userid]
            }, this)
        }, this)

        this.users.sort(function(a, b){
            return b.totalMessages - a.totalMessages
        })
    }

    printTotals() {
        const heading = document.createElement('h2')
        heading.innerHTML = 'All time stats'
        this.main.appendChild(heading)

        const table = document.createElement('table')
        const head = table.createTHead()
        const headRow = head.insertRow()
        const headers = ['#', 'Name', 'Messages']
        headers.forEach(function(header){
            const th = document.createElement('th')
            th.innerHTML = header
            headRow.appendChild(th)
        })
        const foot = table.createTFoot()
        const footRow = foot.insertRow()
        const footers = ['#', 'Total', this.totalMessages]
        footers.forEach(function(footer){
            const th = document.createElement('th')
            th.innerHTML = footer
            footRow.appendChild(th)
        })

        const body = document.createElement ("tbody");
        var i = 0
        this.users.forEach(function(user){
            const row = body.insertRow()
            row.insertCell().innerHTML = ++i
            row.insertCell().innerHTML = user.name
            row.insertCell().innerHTML = user.totalMessages
        })

        table.appendChild(body)
        this.main.appendChild(table)
    }
}

class GoTFUser {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.totalMessages = 0
        this.messagesPerDate = []
    }

    addTotalMessages(number) {
        this.totalMessages += number
    }

    addMessagePerDate(date, messages) {
        this.messagesPerDate.push({date: date, messages: messages})
        this.addTotalMessages(messages)
    }
}

new GoTF(document.getElementsByTagName('body')[0])
