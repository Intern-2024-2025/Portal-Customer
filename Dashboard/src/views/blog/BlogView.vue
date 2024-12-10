<script setup lang="ts">
import { ref } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

type typeBlog = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;  
};

const Blogs = ref<typeBlog[]>([
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.', author: 'Author 1', date: '2024-01-01', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.', author: 'Author 2', date: '2024-02-01', image: 'https://via.placeholder.com/150' }
]);

const pageTitle = ref('Blog List');

// State untuk Modal dan New Blog Object
const showModal = ref(false);
const newBlog = ref<typeBlog>({
  id: 0,
  title: '',
  content: '',
  author: '',
  date: '',
  image: ''  
});
const isEditMode = ref(false);
const isDetailMode = ref(false);

// Buka modal untuk menambah/mengedit/melihat detail blog
const openBlogModal = (blog?: typeBlog, mode: 'edit' | 'detail' = 'edit') => {
  if (blog) {
    newBlog.value = { ...blog };
    isEditMode.value = mode === 'edit';
    isDetailMode.value = mode === 'detail';
  } else {
    resetForm();
    isEditMode.value = true;
    isDetailMode.value = false;
  }
  showModal.value = true;
};

// Handle perubahan gambar
const onImageChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newBlog.value.image = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Simpan blog (tambah/edit)
const saveBlog = () => {
  if (newBlog.value.title && newBlog.value.content) {
    if (isEditMode.value) {
      const index = Blogs.value.findIndex(blog => blog.id === newBlog.value.id);
      if (index !== -1) Blogs.value[index] = { ...newBlog.value };
    } else {
      newBlog.value.id = Blogs.value.length + 1; // Generasi ID sederhana
      Blogs.value.push({ ...newBlog.value });
    }
    resetForm();
  } else {
    alert('Silakan isi semua kolom yang diperlukan.');
  }
};

// Hapus blog
const deleteBlog = (id: number) => {
  Blogs.value = Blogs.value.filter(blog => blog.id !== id);
};

// Reset form dan tutup modal
const resetForm = () => {
  newBlog.value = { id: 0, title: '', content: '', author: '', date: '', image: '' };
  showModal.value = false;
  isEditMode.value = false;
  isDetailMode.value = false;
};

</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />

    <button @click="openBlogModal()" class="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
      </svg>
      Tambah Blog Baru
    </button>

    <div class="border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="py-4 px-4">Gambar</th>
              <th class="py-4 px-4">Judul</th>
              <th class="py-4 px-4">Penulis</th>
              <th class="py-4 px-4">Tanggal</th>
              <th class="py-4 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(blog) in Blogs" :key="blog.id">
              <td class="py-4 px-4">
                <img v-if="blog.image" :src="blog.image" alt="Blog Image" class="w-16 h-16 rounded-md object-cover" />
              </td>
              <td class="py-4 px-4">{{ blog.title }}</td>
              <td class="py-4 px-4">{{ blog.author }}</td>
              <td class="py-4 px-4">{{ blog.date }}</td>
              <td class="py-4 px-4 flex space-x-3">
                <button @click="openBlogModal(blog, 'detail')" aria-label="Lihat Detail">
                  <svg class="w-5 h-5 text-gray-500 hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 4a6 6 0 110 12 6 6 0 010-12z"/>
                  </svg>
                </button>
                <button @click="openBlogModal(blog, 'edit')" aria-label="Edit Blog">
                  <svg class="w-5 h-5 text-gray-500 hover:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 13V16h3l9-9-3-3-9 9zM14.7 3.3a1 1 0 011.4 1.4l-2 2-1.4-1.4 2-2z"/>
                  </svg>
                </button>
                <button @click="deleteBlog(blog.id)" aria-label="Hapus Blog">
                  <svg class="w-5 h-5 text-gray-500 hover:text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 3a1 1 0 011-1h2a1 1 0 011 1v1h5a1 1 0 010 2h-1v11a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 010-2h5V3zm1 4a1 1 0 00-2 0v7a1 1 0 002 0V7zm4 0a1 1 0 10-2 0v7a1 1 0 102 0V7z"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-6 text-center text-indigo-600">
          {{ isEditMode ? 'Edit Blog' : isDetailMode ? 'Detail Blog' : 'Tambah Blog Baru' }}
        </h2>

        <form v-if="isEditMode || !isDetailMode" @submit.prevent="saveBlog" class="space-y-4">
          
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Judul</label>
            <input type="text" id="title" v-model="newBlog.title" class="w-full border border-gray-300 rounded-md p-2" :readonly="isDetailMode">
          </div>

          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">Konten</label>
            <textarea id="content" v-model="newBlog.content" rows="4" class="w-full border border-gray-300 rounded-md p-2" :readonly="isDetailMode"></textarea>
          </div>

          <div>
            <label for="author" class="block text-sm font-medium text-gray-700">Penulis</label>
            <input type="text" id="author" v-model="newBlog.author" class="w-full border border-gray-300 rounded-md p-2" :readonly="isDetailMode">
          </div>

          <div>
            <label for="date" class="block text-sm font-medium text-gray-700">Tanggal</label>
            <input type="date" id="date" v-model="newBlog.date" class="w-full border border-gray-300 rounded-md p-2" :readonly="isDetailMode">
          </div>

          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Gambar</label>
            <input type="file" @change="onImageChange" accept="image/*" class="w-full" :disabled="isDetailMode">
            <img v-if="newBlog.image" :src="newBlog.image" alt="Preview Image" class="mt-4 w-24 h-24 object-cover rounded-md">
          </div>

          <div class="flex justify-end space-x-4">
            <button type="button" @click="resetForm" class="px-4 py-2 bg-gray-300 text-black rounded-md">Batal</button>
            <button v-if="isEditMode" type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md">Simpan</button>
          </div>
          
        </form>

        <div v-else class="space-y-4">
          <p><strong>Judul:</strong> {{ newBlog.title }}</p>
          <p><strong>Penulis:</strong> {{ newBlog.author }}</p>
          <p><strong>Tanggal:</strong> {{ newBlog.date }}</p>
          <div><strong>Konten:</strong> {{ newBlog.content }}</div>
          <img v-if="newBlog.image" :src="newBlog.image" alt="Blog Image" class="mt-4 w-24 h-24 object-cover rounded-md">

          <button @click="resetForm" class="mt-4 px-4 py-2 bg-gray-300 text-black rounded-md">Tutup</button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
