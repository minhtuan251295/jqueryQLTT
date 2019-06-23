$(document).ready(function(){

  var quanLyNguoiDung = new QuanLyNguoiDung();
  var danhSachNguoiDungService = new DanhSachNguoiDungService();

  var resultAjax = danhSachNguoiDungService.layDanhSachNguoiDung();
  resultAjax
    .done(
      function(result){
        quanLyNguoiDung.mangNguoiDung = result;
        HienThi();
        localStorage.setItem("DSND", JSON.stringify(result));
      }
    )
    .fail(function(err){
      console.log(err);
    })


  //show Modal
  function ShowModal (title, buttonLabel, idBtn) {
    var modalTitle = $('#modal-title'); // document.getEleById()
    modalTitle.html(title);

    var contentFooter = `
      <button id="btn${idBtn}" class="btn btn-success">${buttonLabel}</button>
      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
    `;
    
    var modelFooter = $('#modal-footer');
    modelFooter.html(contentFooter);
  }

  $('#btnThemNguoiDung').click(function(){
    ShowModal("Thêm Người Dùng", "Thêm", "ThemND");
  });

  //Thêm nhân viên
  $('body').delegate("#btnThemND", "click", function(){
    //Lấy thông tin
    var taiKhoan = $('#TaiKhoan').val();
    var hoTen = $('#HoTen').val();
    var matKhau = $('#MatKhau').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var maLoaiNguoiDung = $('#maloaiND').val();

    //Tạo đối tượng người dùng
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);

    var ajax = danhSachNguoiDungService.themNguoiDung(nguoiDung);
    ajax
      .done(function(result){
        if(result == "tai khoan da ton tai !"){
          alert("Tài khoản, Họ Tên đã tồn tại, vui lòng nhập tên tài khoản khác");
        }
        else{
          location.reload();
        }
      })
      .fail(function(err){
        console.log(err);
      })
    //Goi phuong thuc ThemNguoiDung
    // HienThi();
  })

  function HienThi(){
    var content = "";
    quanLyNguoiDung.mangNguoiDung.map(function(nguoiDung, index){
      content += `
        <tr>
          <td>${index + 1}</td>
          <td>${nguoiDung.TaiKhoan}</td>
          <td>${nguoiDung.MatKhau}</td>
          <td>${nguoiDung.HoTen}</td>
          <td>${nguoiDung.Email}</td>
          <td>${nguoiDung.SoDT}</td>
          <td>${nguoiDung.TenLoaiNguoiDung}</td>
          <td>
            <button class="btn btn-info">Sửa</button>
            <button class="btn btn-danger" id="btnXoaNguoiDung"
            data-id="${nguoiDung.TaiKhoan}">Xoá</button>
          </td>
        </tr>
      `
    })

    $('#tblDanhSachNguoiDung').html(content);
  }

  $('body').delegate("#btnXoaNguoiDung", "click", function(){
    var id = $(this).data("id");
    var ajax = danhSachNguoiDungService.XoaNguoiDung(id);
    ajax
      .done(function(result){
        location.reload()
      })
      .fail(function(err){
        console.log(err);
      })
  })

})