const express=require('express');
const db=require('./Database/db');
const app=express();
//Middleware
app.use(express.json());
const port='8080';


/* REST API to Get all books
    @route /books
    @description "GET the details of database" 
    @method GET
    @params -
    @return_type JSON object
    @content type text/JSON
*/
app.get("/", (req, res) => {
    res.json(db);
})

/* REST API to Get all books based on the book_id
    @route /books
    @description "GET the book based on the isbn" 
    @method GET
    @params -
    @return_type JSON object
    @content type text/JSON
*/
app.get("/book/:book_id",(req,res)=>{
    const{
        book_id
    }=req.params;
    //let book=db.books.filter(element=> element.book_id==book_id);
    let book={};
    db.books.forEach(ele=>{
        if(ele.book_id==book_id){
            book=ele;
        }
    })
    if(book.length==0){
        responseObj={
            data:{},
            message:`The book is not having the required ISBN ${book_id}`,
            status:404
        }
    }else{
        responseObj={
            data:book,
            message:"successful",
            status:200
        }
    }
    console.log(responseObj);
})

/* REST API to Get all books based on the category
    @route /books
    @description "Get all books based on the category" 
    @method GET
    @params -
    @return_type JSON object
    @content type text/JSON
*/
app.get("/book/:category/category",(req,res)=>{
    const{
        category
    }=req.params;
    category_book=[];
    db.books.forEach(element=>{
        if(element.category.some(ele=>ele==category)){
            category_book.push(element)
        }
    });
    let responseObj={};
    if(category_book.length==0){
        responseObj={
            data:{},
            message:`No books available to the category ${category}`
        }
    }else{
        responseObj={
            data:category_book,
            message:`books are available`
        }
    }
    res.json(responseObj);
})

/* REST API to Get the information about the authors based on the sepcific isbn
    @route /books
    @description "Get the information about the authors based on the sepcific isbn" 
    @method GET
    @params -
    @return_type JSON object
    @content type text/JSON
*/

app.get("/book/:isbn/authors",(req,res)=>{
    const{
        isbn
    }=req.params;
    let book_author=[];
    db.books.forEach(ele=>{
        console.log("hi");
        if(ele.book_id==isbn){
            console.log("his");
            ele.authors.forEach(element=>{
                console.log(element);
                db.authors.forEach(elem=>{
                    if(elem.id==element){
                        book_author.push(elem);
                    }
                })
            })
        }
    })
    let responseObj={};
    if(author_book.length==0){
        responseObj={
            data:{},
            message:`No books available to the category ${isbn}}`
        }
    }else{
        responseObj={
            data:book_author,
            message:`books are available`
        }
    }
    res.json(responseObj);
})

/* REST API to Get all authors belonging to specific publications
    @route /authors/publications/:publisher
    @description "GET all authors belonging to specific publication" 
    @method GET
    @params -
    @return_type JSON object
    @content type text/JSON
*/
app.get("/book/:publisher_name/publications",(req,res)=>{
    const {
        publisher_name,
    } = req.params;
    var publisher = db.publications.filter((publisher) => publisher.name == publisher_name);
    publisher=publisher[0];
    var result =[]; 
    for (let i = 0; i < db.authors.length; i++) {
        let author = db.authors[i];
        let len=author.books;
        for (let j = 0; j < len.length; j++) {
            const a_book = author.books[j];
            for (let m = 0; m < publisher.books.length; m++) {
                const p_book = publisher.books[m];
                if(a_book === p_book){
                    result.push(author)
                }
            }
        }
            
    }
    var responseObj = {};
    if(result.length == 0){
        responseObj = {
            data: {},

            message: `No authors found for publisher of ${publisher_name}`,

            status: 404
        }
    }
    else{
        responseObj = {
            data: result,

            message: `${result.length} authors found for book ID of ${publisher_name}`,

            status: 200
        }
    }
    
    res.send(responseObj);
})

/* REST API to POST books 
    @route /books
    @description "POST book to db.books" 
    @method POST
    @params -
    @return_type JSON object
    @content type application/JSON
*/

app.post("/insert",(req,res)=>{
    const{
        insert_book
    }=req.body;
    if(db.books == undefined) console.log([]);
    else db.books.push(insert_book);
    res.json(db.books);
})

/* REST API to PUT publications 
    @route /books
    @description "Update the publication of a book" 
    @method PUT
    @params -
    @return_type JSON object
    @content type application/JSON
*/
app.put("/update/:books_id",(req,res)=>{
    const{
        books_id
    }=req.params;
    db.books.forEach(ele=>{
        if(ele.book_id==books_id){
            ele.publication=3;
        }
    })
    res.json(db.books);
})




app.listen(port,()=>{
    console.log(`https://localhost${port}`);
})