import { buyAndSellContract, getFreeItemsContract } from './interacting.js'


const FreeItemsContract = getFreeItemsContract()
const SellAndBuyContract = buyAndSellContract()

const containerRow = document.getElementById("containerRow")
const confirmedBuyBtn = document.getElementById("confirmedBuyBtn")


function renderCards(title, nftId, price, src,productId) {
    document.getElementById("containerRow").innerHTML += `

     <div class="col onsellCol">
        <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 16rem;">
            <img src=${src} class="card-img-top" alt="...">
            <div class="card-body">
  
                <h5 class="card-title cardTitle">${title}</h5>
                <span class="card-text">NFT Id : <span id="nft-film-id" >${nftId}</span></span><br>
                <span class="card-text">Цена: <span id="nft-film-id">${price}</span> Eth</span><br>
                <button class="btn btn-danger" id="buyBtn" data-id="${productId}" data-price=${price}>Купить</button>
                <button class="btn btn-dark" id="auctionBtn">Ставка</button>
            </div>
        </div>        
    </div>`
}
window.onload = renderEstates()


async function renderEstates() {
    ItemTitle.textContent = "All availabe Estates"
    estates1.style.visibility = "hidden"
    music1.style.visibility = "visible"
    films1.style.visibility = "visible"

    const estateImg = "dependencies/img/real_estate.jpg"
    const allOnSellProduct = await SellAndBuyContract.getTotalProductCreated()
    for (let index = 1; index <= allOnSellProduct; index++) {
        const product = await SellAndBuyContract.getProductDetail(index)
        const item = await FreeItemsContract.getItemDetails(product.itemId)
        if (item._type == 1 && product.isSold === false) {

            renderCards("Estate", item.id, ethers.utils.formatEther(product.price), estateImg,product.id)
        }
    }
}
async function renderFilms() {
    ItemTitle.textContent = "All availabe Films"
    estates1.style.visibility = "visible"
    music1.style.visibility = "visible"
    films1.style.visibility = "hidden"

    const filmImg = "dependencies/img/film.jpg"
    const allOnSellProduct = await SellAndBuyContract.getTotalProductCreated()
    for (let index = 1; index <= allOnSellProduct; index++) {
        const product = await SellAndBuyContract.getProductDetail(index)
        const item = await FreeItemsContract.getItemDetails(product.itemId)
        if (item._type == 2 && product.isSold === false) {

            renderCards("Estate", item.id, ethers.utils.formatEther(product.price), filmImg,product.id)
        }
    }
}
async function renderMusic() {
    ItemTitle.textContent = "All availabe Music"
    estates1.style.visibility = "visible"
    music1.style.visibility = "hidden"
    films1.style.visibility = "visible"

    const musicImg = "dependencies/img/music.jpg"
    const allOnSellProduct = await SellAndBuyContract.getTotalProductCreated()
    for (let index = 1; index <= allOnSellProduct; index++) {
        const product = await SellAndBuyContract.getProductDetail(index)
        const item = await FreeItemsContract.getItemDetails(product.itemId)
        if (item._type == 3 && product.isSold === false) {

            renderCards("Music", item.id, ethers.utils.formatEther(product.price), musicImg,product.id)
        }
    }
}


document.getElementById("estates1").addEventListener("click", () => {
    containerRow.innerHTML = ""
    renderEstates()
})
document.getElementById("films1").addEventListener("click", () => {
    containerRow.innerHTML = ""
    renderFilms()
})
document.getElementById("music1").addEventListener("click", () => {
    containerRow.innerHTML = ""
    renderMusic()
})

document.addEventListener('click', async function expendModal(e) {
    if (e.target && e.target.id == 'buyBtn') {
        const id = e.target.getAttribute("data-id")
        const price = e.target.getAttribute("data-price")
        const amount = { value: ethers.utils.parseEther(price) }
        try {
            console.log("id",id,"price",amount);
            $(document.getElementById('waitingModal')).modal("show")
            const buy = await SellAndBuyContract.purchaseProduct(1,amount)
        } catch (error) {
            $(document.getElementById('waitingModal')).modal("hide")
           console.log(error);
        }

    }

}
)




SellAndBuyContract.on("ItemsSold", () => {
    $(document.getElementById('waitingModal')).modal('hide')

})