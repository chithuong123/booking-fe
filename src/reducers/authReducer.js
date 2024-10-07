// authReducer.js

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),  // Kiểm tra token trong localStorage khi khởi tạo
  loading: false,
  error: null,
  success: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,  // Bắt đầu loading khi yêu cầu đăng nhập
        error: null,  // Xóa lỗi cũ (nếu có) khi bắt đầu đăng nhập mới
        success: false,  // Đặt lại success
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,  // Đặt isLoggedIn thành true khi đăng nhập thành công
        loading: false,  // Kết thúc loading
        success: true,  // Đặt success thành true để cho biết đăng nhập thành công
        error: null,  // Xóa mọi lỗi trước đó
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoggedIn: false,  // Đặt isLoggedIn thành false khi đăng nhập thất bại
        loading: false,  // Kết thúc loading
        error: action.payload,  // Lưu lỗi đăng nhập
        success: false,  // Đặt success thành false khi thất bại
      };

    case 'LOGOUT':
      localStorage.removeItem('token');  // Xóa token khỏi localStorage khi logout
      return {
        ...state,
        isLoggedIn: false,  // Đặt lại isLoggedIn thành false
        success: false,  // Đặt success thành false
        error: null,  // Xóa mọi lỗi trước đó
      };

    case 'SET_AUTH_STATUS':
      return {
        ...state,
        isLoggedIn: action.payload,  // Cập nhật trạng thái isLoggedIn
      };

    default:
      return state;
  }
}
