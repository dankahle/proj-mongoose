

todo

* does findbyid throw error when not found?



/// order 
Cust(name String, addrs [Addr]) 
Addr(street: String, city: String, active: Boolean)
Order(cust_id ref Cust(pop), orderDate Date, total Number, shipAddr Addr, items[Item]
Item(name String, price Number, quantity Number)


UI
///cust page
name
list addr with addr form and addrAdd button
custAdd button

/// order page
list of cust, pick with dropdown
cust name, list of addr, pick addr with radio

list of items with checkboxes, check items and it updates total


