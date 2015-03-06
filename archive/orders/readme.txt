

/// order 
cust(name) with subdoc array addr(street city)
item(name, price, quantity)
order(cust(pop), date, total, shipAddr, items(pop)

UI
///cust page
name
list addr with addr form and addrAdd button
custAdd button

/// order page
list of cust, pick with dropdown
cust name, list of addr, pick addr with radio

list of items with checkboxes, check items and it updates total


