<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getSingleUser } from '../api/usersAPI';
import PageLayout from '../components/PageLayout.vue';

const route = useRoute();
const isLoading = ref(true);
const user = ref(null);

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function loadData() {
  isLoading.value = true;
  user.value = await getSingleUser(route.params.id);
  isLoading.value = false;
}

// onMounted(() => loadData);

watch(() => route.params.id, loadData, { immediate: true });
</script>

<template>
  <PageLayout title="User details" :is-loading="isLoading" background>
    <template v-if="user" #title>
      <header class="profile-header">
        <div class="profile-image">
          <img :src="user.image" :alt="user.firstName">
        </div>
        <div class="profile-basic-info">
          <h1>{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="title">
            {{ user.company.title }} at {{ user.company.name }}
          </p>
        </div>
      </header>
    </template>

    <div v-if="user" class="profile-sections">
      <section class="profile-section">
        <h2>Personal Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Email:</span>
            <span>{{ user.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">Phone:</span>
            <span>{{ user.phone }}</span>
          </div>
          <div class="info-item">
            <span class="label">Birth Date:</span>
            <span>{{ formatDate(user.birthDate) }}</span>
          </div>
          <div class="info-item">
            <span class="label">Age:</span>
            <span>{{ user.age }}</span>
          </div>
        </div>
      </section>

      <section class="profile-section">
        <h2>Location</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Address:</span>
            <span>{{ user.address.address }}</span>
          </div>
          <div class="info-item">
            <span class="label">City:</span>
            <span>{{ user.address.city }}, {{ user.address.stateCode }}</span>
          </div>
          <div class="info-item">
            <span class="label">Postal Code:</span>
            <span>{{ user.address.postalCode }}</span>
          </div>
          <div class="info-item">
            <span class="label">Country:</span>
            <span>{{ user.address.country }}</span>
          </div>
        </div>
      </section>

      <section class="profile-section">
        <h2>Professional</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Department:</span>
            <span>{{ user.company.department }}</span>
          </div>
          <div class="info-item">
            <span class="label">University:</span>
            <span>{{ user.university }}</span>
          </div>
          <div class="info-item">
            <span class="label">Role:</span>
            <span class="role-badge">{{ user.role }}</span>
          </div>
        </div>
      </section>
    </div>
  </PageLayout>
</template>

<style scoped>
.profile-container {
  max-width: calc(1200px + 2 * 1rem);
  margin: 1rem auto;
  padding: 1rem;
  display: grid;
  gap: 1rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.profile-image img {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-basic-info h1 {
  margin: 0;
  font-size: 2rem;
  color: #333;
}

.profile-basic-info .title {
  margin: 0.5rem 0 0;
  color: #666;
  font-size: 1.1rem;
}

.profile-sections {
  display: grid;
  gap: 2rem;
}

.profile-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
}

.profile-section h2 {
  margin: 0 0 1rem;
  color: #444;
  font-size: 1.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #4CAF50;
  color: white;
  border-radius: 16px;
  text-transform: capitalize;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .profile-container {
    padding: 1rem;
  }
}
</style>
