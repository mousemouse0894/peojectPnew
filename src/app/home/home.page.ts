import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public imageSelect: any = null;
  public imageProcess: any = null;

  constructor(private camera:Camera,private http:HttpClient) {}
  public onBack() {
    
  }
  public deleteimage(){
    null;
  }
  public onOpencamera() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imageSelect = imageData;
        this.http
          .post(
            "https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=th&secret_key=sk_9ee63276d1d00be2f697491b",
            this.imageSelect
          )
          .subscribe((res: any) => {
            this.imageProcess = res;
          });
      },
      err => {}
    );
  }
  public onOpengallery() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imageSelect = imageData;
        this.http
          .post(
            "https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=th&secret_key=sk_9ee63276d1d00be2f697491b",
            this.imageSelect
          )
          .subscribe((res: any) => {
            this.imageProcess = res;
          });
      },
      err => {}
    );
  }

}
