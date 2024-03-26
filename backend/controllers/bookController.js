import Book from "../models/bookModel.js"


const createBook = async (req,res) => {
    try {
        const book = await Book.create(req.body)
        res.status(200).json({
            succeded: true,
            book
        })
        
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
        //* alttakilerde farklı error mesajı yazdırma şekli catch içindeler ikiside
        //console.log(error.message)
        //res.status(500).send({message: error.message})
    }
}


const getAllBooks = async (req,res) => {
    try {
        const books = await Book.find({})
        res.status(200).json({
            succeded: true,
            count: books.length,
            data: books
        })
    } catch (error) {
        req.status(500).json({
            succeded: false,
            error
        })
    }
}



const  getABook = async (req,res) => {
    try {
        //* sadece bu yorum satırındaki gibi de yapabilirdik. id'yi bu şekilde alabilirdik yani
        //const {id} = req.params 
        //const book  = await Book.findById(id)

        const book  = await Book.findById({_id: req.params.id})
        
        res.status(200).json(book)

        //! Sadece book verisini yolladım. Çünkü succeded:true olayı frontend'de book nesnesini yazdırırken zorluk çıkarıyordu
        //! book verisini bir nesneye atmadığım için (data: book gibi) json içinde süslü parantez yazmama gerek yok.Köşeli parantez yazman lazım
        //! Süslü parantez yazarsan bide köşelinin içine yine frontendde hata alrm çünkü ulaşmak istediğim zaman ulaşamıyorum süslü parantez yüzünden
        //! İlla eskisi gibi yazmak istiyom dersen Frontendde buranın zorluk çıkarmaması için data:book değerini atman lazım aşağıdaki gibi,  alırkende  axios'dan res.data.data şeklinde alman lazım ama uğraşmamak yerine yukardaki gibi yapabilirsin
        // res.status(200).json({
        //     succeded: true,
        //     data: book
        // })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}


const updateBook = async (req,res) => {
    try {
        //* Yorumdaki gibide yazabilirdin  findByIdAndUpdate fonksiyonunu
        //const {id} = req.params
        //const updatedBook = await Book.findByIdAndUpdate(id, req.body)

       const updatedBook = await Book.findByIdAndUpdate({_id: req.params.id}, req.body)

       if(!updatedBook){
           return res.status(404).json({ message: "Book Not Found" })
       }

        res.status(200).send({
            succeded: true,
            message: "Book Updated Successfully"
       })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}



const deleteBook = async (req,res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete({_id: req.params.id})

        if(!deletedBook){
            return res.status(404).json({ message: "Book Not Found" })
        }

        res.status(200).json({
            succeded: true,
            message: "Book is deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

export {createBook,getAllBooks,getABook, updateBook, deleteBook}