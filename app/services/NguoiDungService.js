function NguoiDungService(){
    
    this.themNguoiDung = function (nguoiDung){
        return axios ({
            method: "POST",
            url:"http://5dbacb9d3ec5fb00143193e9.mockapi.io/api/NguoiDung",
            data: nguoiDung,
        })
    }
    this.layDanhSachNguoiDung = function (){
        // Get : lay du lieu tu server
        // Post : up du lieu len server
        // Put : cap nhat du lieu len server
        // Delete: xoa du lieu tren server
        return axios({
            method: "GET",
            url:"http://5dbacb9d3ec5fb00143193e9.mockapi.io/api/NguoiDung",
        })
        // Promise thanh cong
        
    
    }
    this.xoaNguoiDung = function (id){
        return axios ({
            method: "DELETE",
            url:`http://5dbacb9d3ec5fb00143193e9.mockapi.io/api/NguoiDung/${id}`,
        })
    }
    this.layThongTinNguoiDung = function (id) {
        return axios ({
            method:"GET",
            url:`http://5dbacb9d3ec5fb00143193e9.mockapi.io/api/NguoiDung/${id}`,
        })
    }
    this.capNhatNguoiDung = function (id,nguoiDung){
        return axios ({
            method:"PUT",
            url:`http://5dbacb9d3ec5fb00143193e9.mockapi.io/api/NguoiDung/${id}`,
            data: nguoiDung,
        })
    }
    this.timKiemNguoiDung = function (chuoiTimKiem, mangNguoiDung){
        /**
         * 1.Tao mang rong mangTimKiem[]
         * 2.Duyet mangNguoiDung
         * 3.su dung ham indexOf so sanh
         * 4.them nguoi dung tim thay vao mag mangTimKiem;
         * 
        */
    // Cách 1   
    //    var mangTimKiem = [];
    //    mangNguoiDung.map(function(item,index){
    //        if (item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1){
    //             mangTimKiem.push(item);
    //        }
    //    });
    //    return mangTimKiem;
    
    // CÁCH 2 XÀI FILTER
    return mangNguoiDung.filter(function(item){
        return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1
    })
    }
}

