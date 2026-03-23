import { SliderAdminService, SliderItem } from './../../services/slider.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slider-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, RouterLink],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderAdminComponent implements OnInit {
  slides: SliderItem[] = [];

  form = {
    imageUrl: '',
    imagePath: '',
    order: 1,
    active: true
  };

  editingId: string | null = null;
  loading = false;
  selectedFile: File | null = null;

  constructor(private sliderService: SliderAdminService) {}

  ngOnInit(): void {
    this.sliderService.getSlides().subscribe(items => {
      this.slides = items;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  async save() {
    if (!this.editingId && !this.selectedFile) {
      alert('Please select an image');
      return;
    }

    this.loading = true;

    try {
      let imageUrl = this.form.imageUrl;
      let imagePath = this.form.imagePath;

      if (this.selectedFile) {
        const uploadResult = await this.sliderService.uploadImage(this.selectedFile);
        imageUrl = uploadResult.imageUrl;
        imagePath = uploadResult.imagePath;
      }

      const payload = {
        imageUrl,
        imagePath,
        order: this.form.order,
        active: this.form.active
      };

      if (this.editingId) {
        await this.sliderService.updateSlide(this.editingId, payload);
      } else {
        await this.sliderService.createSlide(payload);
      }

      this.resetForm();
    } catch (error) {
      console.error(error);
      alert('Error saving slide');
    } finally {
      this.loading = false;
    }
  }

  editSlide(item: SliderItem) {
    this.editingId = item.id ?? null;
    this.form = {
      imageUrl: item.imageUrl,
      imagePath: item.imagePath ?? '',
      order: item.order,
      active: item.active
    };
    this.selectedFile = null;
  }

  async deleteSlide(item: SliderItem) {
    if (!item.id) return;

    const confirmed = confirm(`Delete`);
    if (!confirmed) return;

    try {
      await this.sliderService.deleteSlide(item.id, item.imagePath);

      if (this.editingId === item.id) {
        this.resetForm();
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting slide');
    }
  }

  resetForm() {
    this.editingId = null;
    this.selectedFile = null;
    this.form = { 
      imageUrl: '',
      imagePath: '',
      order: 1,
      active: true
    };
  }
}