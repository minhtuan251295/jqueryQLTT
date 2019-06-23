//Lớp đối tượng
function DanhSachNguoiDungService() {
  //Lấy danh sách người dùng từ server (API)
  this.layDanhSachNguoiDung = function () {
    return $.ajax({
      url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
      type: "GET",
    })
  }

  //Thêm người dùng
  this.themNguoiDung = function(dataNguoiDung) {
    return $.ajax({
      url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
      type: "POST",
      data: dataNguoiDung,
    })
  }

  //Xoá người dùng
  this.XoaNguoiDung = function(id){
    return $.ajax({
      url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`,
      type: "DELETE"
    })
  }
}