import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SliderItem {
  id?: string;
  imageUrl: string;
  imagePath?: string;
  order: number;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class SliderAdminService {
  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getSlides(): Observable<SliderItem[]> {
    const refCollection = collection(this.firestore, 'home_slider');

    return (collectionData(refCollection, { idField: 'id' }) as Observable<SliderItem[]>).pipe(
      map(items => items.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999)))
    );
  }

  async uploadImage(file: File): Promise<{ imageUrl: string; imagePath: string }> {
    const filePath = `slider-images/${Date.now()}-${file.name}`;
    const storageRef = ref(this.storage, filePath);

    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    return {
      imageUrl,
      imagePath: filePath
    };
  }

  async createSlide(data: Omit<SliderItem, 'id'>): Promise<void> {
    const refCollection = collection(this.firestore, 'home_slider');
    await addDoc(refCollection, data);
  }

  async updateSlide(id: string, data: Omit<SliderItem, 'id'>): Promise<void> {
    const docRef = doc(this.firestore, `home_slider/${id}`);
    await updateDoc(docRef, { ...data });
  }

  async deleteSlide(id: string, imagePath?: string): Promise<void> {
    const docRef = doc(this.firestore, `home_slider/${id}`);
    await deleteDoc(docRef);

    if (imagePath) {
      const storageRef = ref(this.storage, imagePath);
      await deleteObject(storageRef);
    }
  }
}