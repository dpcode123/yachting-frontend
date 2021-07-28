import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import '@/assets/css/toast.css';

export default class ToastService {

  constructor() {}

  raiseToast = (message, type) => {
    createToast(message, {
      hideProgressBar: true, 
      type: type,
      position: 'top-right',
      transition: 'slide',
      timeout: 2500
    })

    /* types: default, info, warning, success, danger */
  }
}