var nguoiDungService = new NguoiDungService();

function getListUser(){
    nguoiDungService.layDanhSachNguoiDung()
    .then(function(result){
        renderTable(result.data);
        setLocalStorage(result.data);
    })
    // Promise khong thanh cong
    .catch(function(error){
        console.log(error);
    });

}
// Luu mang nguoi dung xuong local storage
function setLocalStorage(mangNguoiDung){
    localStorage.setItem("DanhSachNguoiDung", JSON.stringify(mangNguoiDung));
}
// Lay mang nguoi dung tu local storage
function getLocalStorage(){
    if(localStorage.getItem("DanhSachNguoiDung")){
     return JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
    }
}
// Chức năng tìm kiếm
getEle("txtSearch").addEventListener('keyup',function(){
    var mangNguoiDung = getLocalStorage();
    var chuoiTimKiem = getEle("txtSearch").value;
    var mangTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem,mangNguoiDung);
    renderTable(mangTimKiem);
})
getListUser();

getEle("btnThemNguoiDung").addEventListener('click',function(){
    var title = "Thêm Người Dùng";
    var footer = `
    <button class="btn btn-success" onclick="themNguoiDung()">Thêm</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})
function themNguoiDung(){
    console.log("click thanh cong");
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;
    
    var nguoiDung = new NguoiDung (taiKhoan,hoTen,matKhau,email,soDT,maLoaiNguoiDung);
    nguoiDungService.themNguoiDung(nguoiDung)
    .then(function(result){
        console.log(result.data);
        getListUser();
    })
    .catch(function(error){
        console.log(error);
    })
    
}
function renderTable(mangNguoiDung){
    var contentHTML = "";
    console.log(mangNguoiDung);
    mangNguoiDung.map(function(item,index){
        contentHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.soDT}</td>
        <td>${item.maLoaiNguoiDung}</td>
        </tr>
        <button class="btn btn-success" data-toggle="modal"
        data-target="#myModal" onclick="sua(${item.id})">Sửa</button>
        <button class="btn btn-danger" onclick="xoa(${item.id})">Xóa</button>
        `;
        
    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = contentHTML;
}
function xoa (id){
    nguoiDungService.xoaNguoiDung(id)
    .then (function(result){
        console.log(result);
        getListUser();
    })
    .catch(function(error){
        console.log(error);
    })
}
function sua (id){
    var footer = `
    <button class="btn btn-success" onclick="capNhat(${id})">Cập nhật</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa thông tin";
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    nguoiDungService.layThongTinNguoiDung(id)
    .then(function(result){
        console.log(result);
    getEle("TaiKhoan").value = result.data.taiKhoan;
    getEle("HoTen").value = result.data.hoTen;
    getEle("MatKhau").value = result.data.matKhau;
    getEle("Email").value = result.data.email;
    getEle("SoDienThoai").value = result.data.soDT;
    getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
    getEle("TaiKhoan").setAttribute("disabled",true);
    })
    .catch(function(error){
        console.log(error);
    })
    console.log(id)
}
function capNhat(id){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;
    var nguoiDung = new NguoiDung (taiKhoan,hoTen,matKhau,email,soDT,maLoaiNguoiDung);
    console.log (nguoiDung);
    nguoiDungService.capNhatNguoiDung(id,nguoiDung)
    .then(function(result){
        console.log(result)
        getListUser();
    })
    .catch(function(error){
        console.log(error)
    })
    
}
function getEle(id){
    return document.getElementById(id);
    
}
