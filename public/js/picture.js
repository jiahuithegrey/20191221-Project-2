// this is the transition class for storing and sending the image for testing purposes

class IngredientImg {
    constructor (id,data){
        this.id = id;
        this.data = data;
    }

    getImgID(){
        return this.id;
    }

    getImgData(){
        return this.data;
    }


}

module.exports = IngredientImg;