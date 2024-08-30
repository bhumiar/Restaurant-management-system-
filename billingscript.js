let items = [
    {
        item: 'hot coffee',
        price: 53
    },
    {
        item: 'special coffee',
        price: 66
    },
    {
        item: 'mango shake',
        price: 85
    },
    {
        item: 'cold cream coffee',
        price: 92
    },
    {
        item: 'chocolate milk',
        price: 116
    },
    {
        item: 'roohafza sharbat',
        price: 80
    },
    {
        item: 'roohafza milk shake',
        price: 81
    },
    {
        item: 'espresso coffee',
        price: 104
    },
    {
        item: 'lemon squash',
        price: 69
    },
    {
        item: 'badam shake',
        price: 50
    },
    {
        item: 'chocolate shake',
        price: 55
    },
    {
        item: 'stawberry shake',
        price: 75
    },
    {
        item: 'kesar shake',
        price: 66
    },
    {
        item: 'banana shake',
        price: 45
    },
    {
        item: 'bisleri',
        price: 20
    }
]



let inputName = document.querySelector('#item-name')
let submitBtn = document.querySelector('.submit-btn')
let inputQty = document.querySelector('#item-qty')
let table = document.querySelector('table tbody')
let subtotalDiv = document.querySelector('.subtotal')
let taxDiv = document.querySelector('.tax')
let totalDiv = document.querySelector('.total-price')

//tax
let tax = 5
taxDiv.textContent = `${tax}%`

//Cart
let cart = []
let addToCart = (item, qty) => {
    let price = 0
    items.forEach((x) => {
        if (item == x.item) {
            price = x.price
        }
    })

    cart.push({
        item : item,
        qty : qty,
        price : price
    })
}

//Subtotal & total
let subtotal = () => {

    let subtotal = 0
    cart.forEach((x) => {
        subtotal += (x.price*x.qty)
    })
    subtotalDiv.textContent = `RS.${subtotal}`

    let total = Math.round(((subtotal*tax)/100) + subtotal)
    totalDiv.textContent = `RS.${total}`
}

let validateItem = (value) => {
    let check = items.some((x) => {
        return x.item.toLowerCase() == value.toLowerCase()
    })
    return check
}

let createTable = (item, qty) => {

    //item Name
    let td1 = document.createElement('td')
    td1.textContent = item

    //  price
    let td2 = document.createElement('td')
    let price
    items.forEach((x) => {
        if (item == x.item) {
            price = x.price
        }
    })
    td2.textContent = `Rs.${price}`

    //  qty
    let td3 = document.createElement('td')
    td3.textContent = qty

    // total cost of 1 item
    let td4 = document.createElement('td')
    td4.textContent = `Rs.${price * qty}`
    

    // action btn
    let td5 = document.createElement('td')
    td5.classList.add('action-row')
    let removeBtn = document.createElement('button')
    removeBtn.classList.add('action-btn')
    removeBtn.textContent = 'X'
    td5.appendChild(removeBtn)
    removeBtn.addEventListener('click', (e) => {
        debugger
        let r = removeBtn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
        let tableArr = document.querySelectorAll('tbody tr')
        //Remove from html
        tableArr.forEach((x) => {
            if(x.innerHTML.includes(r)){
                x.remove()
            }
        })

        //Remove from cart
        
        cart.forEach((x, i) => {
            if(x.item.includes(r))
            cart.splice(i, 1)
        
        })
        subtotal()
    })

    // tr
    let tr = document.createElement('tr')
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    table.appendChild(tr)
}

submitBtn.addEventListener('click', (e) => {

    let check = validateItem(inputName.value)
    if ((inputName.value != '') && (inputQty.value != 0) && (check) && (inputQty.value > 0)) {
        let item = inputName.value.toLowerCase()
        let qty = parseInt(inputQty.value)
        // console.log(item, qty)
        addToCart(item, qty)
        subtotal()
        createTable(item, qty)
        
        inputName.value = ''
        inputQty.value = '1'
    } else {
        alert('Enter proper values')
    }


})


// MENU

let closeBtn = document.querySelector('.close-btn')
let menu = document.querySelector('.menu')
let menuBtn = document.querySelector('.menu-btn')

// console.log(closeBtn)
// console.log(menu)

menuBtn.addEventListener('click' ,() => {
    menu.classList.add('active')
})

closeBtn.addEventListener('click' ,() => {
    menu.classList.remove('active')
})

// Print
let printBtn = document.querySelector('.print-btn')
printBtn.addEventListener('click', ()=> {
    window.print()
})