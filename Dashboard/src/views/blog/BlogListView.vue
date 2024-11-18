<script setup lang="ts">
import { ref } from 'vue';

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

// State untuk menampilkan form
const showForm = ref(false);
const selectedBlog = ref<typeBlog | null>(null);
const formMode = ref<'add' | 'edit' | 'detail'>('add');

// Membuka form dengan mode yang diinginkan
const openForm = (mode: 'add' | 'edit' | 'detail', blog?: typeBlog) => {
  formMode.value = mode;
  selectedBlog.value = blog || null;
  showForm.value = true;
};

// Menutup form
const closeForm = () => {
  showForm.value = false;
  selectedBlog.value = null;
};

</script>

<template>
  <div>
    <button @click="openForm('add')" class="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4">Tambah Blog Baru</button>

    <div v-if="showForm">
      <BlogForm :blogData="selectedBlog" :mode="formMode" @close="closeForm" />
    </div>

    <div class="border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default">
      <table class="w-full">
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(blog) in Blogs" :key="blog.id">
            <td><img :src="blog.image" class="w-16 h-16 rounded-md" /></td>
            <td>{{ blog.title }}</td>
            <td>{{ blog.author }}</td>
            <td>{{ blog.date }}</td>
            <td>
              <button @click="openForm('detail', blog)">Detail</button>
              <button @click="openForm('edit', blog)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
``
