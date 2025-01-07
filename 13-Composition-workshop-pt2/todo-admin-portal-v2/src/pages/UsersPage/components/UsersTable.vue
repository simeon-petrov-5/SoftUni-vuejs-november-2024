<script setup>
defineProps({
  isLoading: {
    type: Boolean,
  },
  users: {
    required: true,
    type: Array,
  },
});

function formatBirthDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Age</th>
        <th>Email</th>
        <th>Work</th>
        <th>Role</th>
        <th>
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="isLoading">
        <tr v-for="idx in 5" :key="`progress-${idx}`">
          <th colspan="7">
            <progress />
          </th>
        </tr>
      </template>

      <template v-else-if="users.length">
        <tr v-for="user in users" :key="user.id">
          <td>
            {{ user.firstName }} {{ user.lastName }}
          </td>
          <td>
            @{{ user.username }}
          </td>
          <td>
            {{ formatBirthDate(user.birthDate) }}
          </td>
          <td>
            {{ user.email }}
          </td>
          <td>
            {{ user.company.title }}<br>
          </td>
          <td>
            <span>
              {{ capitalizeFirstLetter(user.role) }}
            </span>
          </td>
          <td>
            <router-link :to="{ name: 'userDetails', params: { id: user.id } }">
              <button type="button" class="button contrast outline">
                User Page
              </button>
            </router-link>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
