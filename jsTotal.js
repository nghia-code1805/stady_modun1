var appProducs =function () {
    this.listProducts=[];

    this.setListProduct=function () {                                   //JSON.stringify : chuyển đổi một đối tượng vào một chuỗi để trao đổi dữ liệu từ một máy chủ web
        sessionStorage.listProducts=JSON.stringify(this.listProducts); //sessionStorage : dữ liệu sẽ bị xóa khi các tab trình duyệt đóng lại hoặc thay đổi và load lại
    };
    this.getListProducts=function () {
        this.listProducts=JSON.parse(sessionStorage.listProducts);//JSON.parse : phân tích dữ liệu và các đối tượng sẽ trở thành đối tượng
    };
    this.addProducts=function () { // hàm thêm sản phẩm addProducts
        let newProduct=document.getElementById("newproduct").value;
        let newMoney=document.getElementById("money").value;
        let newImage=document.getElementById("image").value;

        if (newProduct==""||newMoney==""||newImage=="")
        {
            alert("bạn thiếu 1 trong số những thông tin ở trên");
        }
        else {
            this.listProducts.push([newProduct,newMoney,newImage]);//đẩy
            this.setListProduct();
            return this.displayProduct();
        }
    };

    this.DeleteProducts=function (i) { //xóa 1 sản phẩm
        let ConfirmAnswer=confirm("bạn có muốn xóa sản phẩm: "+this.listProducts[0][i]+" này không ?");
        if (ConfirmAnswer){
            let array=[];
            let x=0;
            while (x<this.listProducts.length){
                if (x==i){
                    x++;
                    alert("xóa thành công")
                    continue;
                }else {
                    array.push(this.listProducts[x]);
                    x++;
                }
            }
            this.listProducts=array;
            this.setListProduct();
            return this.displayProduct();
        } else {
            return ;
        }
    };

    this.editProducts=function (i) {    //sửa sản phẩm
    var edit01=prompt("tên sản phẩm");
    if (edit01.trim()==="")
    {
        return;
    }
    var edit02=prompt("giá tiền");
    if (edit02.trim()===""){
        return;
    }

    this.listProducts[i][0]=edit01;
    this.listProducts[i][1]=edit02;
    this.setListProduct();
    return this.displayProduct();

    };

    this.displayProduct=function () {
        this.getListProducts();
        let saut="";
        saut=saut+"<tr>"+"<th>STT</th>"+"<th>Tên Sản Phẩm</th>"+"<th>Giá Tiền</th>"+"<th>Ảnh</th></tr>";
        for (let i=0;i<this.listProducts.length;i++) {
            path="image/"+this.listProducts[i][2].replace(/C:\\fakepath\\/,"");

            saut=saut+"<tr>";
            saut=saut+'<td style="width: 50px; text-align: center"><p>' + (i + 1) + '</p></td>';

            saut=saut+'<td style="width: 100px;text-align: center"><p id="'+i+'">&nbsp;&nbsp;'+this.listProducts[i][0]+'</p></td>';

            saut=saut+'<td style="width: 100px;text-align: center"><p id="'+i+'">&nbsp;&nbsp;'+this.listProducts[i][1]+'</p></td>';

            saut=saut+'<td><img src="'+path+'" width="300px" height="300px"></td>';

            saut=saut+'<td style="width: 100px; text-align: center"><input type="button" class="edit" value="Edit" onclick="editProducts(' + i + ')"></input></td >';

            saut=saut+'<td style="width: 100px; text-align: center"><input type="button" class="delete" value="Delete" onclick="DeleteProducts(' + i + ')"></input></td>';
            saut=saut+"</tr>";
        }
        document.getElementById("tableTotal").innerHTML=saut;
    }
};
var Products=new appProducs();
function DeleteProducts(i) {
    return Products.DeleteProducts(i);
}

function editProducts(i) {
    return Products.editProducts(i);
}
