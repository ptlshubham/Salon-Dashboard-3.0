
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Cart } from 'app/display-products/cart.model';
import { Order } from 'app/display-products/orderslist/order.model';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Products } from './product.model';
@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveProductsList(admin: Products): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveProductsListURL, admin);
    }
    saveCategoryList(admin: Category): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveCategoryListURL, admin);
    }

    getAllProductsList(): Observable<Products[]> {
        return this.httpClient.get<any>(ApiService.getAllProductsListURL);
    }

    getAllCategoryList(): Observable<Category[]> {
        return this.httpClient.get<any>(ApiService.getAllCategoryListURL);
    }
    removeProductDetails(id) {
        return this.httpClient.get<any>(ApiService.removeProductDetailsURL + id);
    }
    updateProductList(admin: Products): Observable<any[]> {
        return this.httpClient.post<any>(ApiService.updateProductListURL, admin);
    }
    updateCategoryList(admin: Category): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateCategoryListURL, admin);
    }

    removeCategoryDetails(id) {
        return this.httpClient.get<any>(ApiService.removeCategoryDetailsURL + id);
    }
    selectUploadImage(img): Observable<any> {

        return this.httpClient.post<any>(ApiService.uploadMainImageURL, img);

    }
    selectMultiUploadImage(img): Observable<any> {
        return this.httpClient.post<any>(ApiService.uploadMultiImageURL, img);
    }
    removeOrChanged() {
        return this.httpClient.get<any>(ApiService.removeImageURL);
    }

    getAllImagesList(id) {
        return this.httpClient.get<any>(ApiService.courosalImageURL + id);
    }

    saveCartList(admin: Cart): Observable<any> {

        return this.httpClient.post<any>(ApiService.saveCartListURL, admin);
    }
    getAllCartList(): Observable<Cart[]> {
        return this.httpClient.get<any>(ApiService.getAllCartListURL);
    }
    getCartListById(id) {
        return this.httpClient.get<any>(ApiService.getCartDataByID + id);
    }
    removeCartDetails(data) {

        return this.httpClient.post<any>(ApiService.removeCartDetailsURL, data);
    }
    updateCartList(admin: Cart): Observable<any[]> {
        return this.httpClient.post<any>(ApiService.updateCartListURL, admin);
    }
    saveOrderList(admin: Order) {
        return this.httpClient.post<any>(ApiService.saveOrderListURL, admin);
    }
    getActiveProductsList(): Observable<Products[]> {
        return this.httpClient.get<any>(ApiService.getActiveProductsURL);
    }
    savePlaceOrder(data) {
        return this.httpClient.post<any>(ApiService.savePlaceOrderListURL, data);
    }
    getAllOrderList(): Observable<Cart[]> {
        return this.httpClient.get<any>(ApiService.getAllOrderListURL);
    }
    getOrderServices(id) {
        return this.httpClient.get<any>(ApiService.getAllProductOrderListURL + id);
    }
    removeCustomerOrder(id) {
        return this.httpClient.get<any>(ApiService.removeCustomerOrderURL + id);
    }
    removeOrderDetails(id) {
        return this.httpClient.get<any>(ApiService.removeOrderDetailsURL + id);
    }
    acceptUserOrder(data) {
        return this.httpClient.post<any>(ApiService.saveAcceptUserOrderURL, data);
    }

}
