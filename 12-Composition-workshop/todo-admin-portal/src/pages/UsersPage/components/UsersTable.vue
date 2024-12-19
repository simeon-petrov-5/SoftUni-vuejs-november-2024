<script setup>
defineProps({
  isLoading: {
    required: true,
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
        <th>User Info</th>
        <th>Contact</th>
        <th>Location</th>
        <th>Work</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="isLoading">
        <tr v-for="idx in 5" :key="`progress-${idx}`" colspan="5">
          <progress />
        </tr>
      </template>

      <template v-else-if="users.length">
        <tr v-for="user in users" :key="user.id">
          <td>
            <div class="profile-info">
              <div>
                <strong>{{ user.firstName }} {{ user.lastName }}</strong><br>
                @{{ user.username }}<br>
                <span class="physical-info">
                  Born: {{ formatBirthDate(user.birthDate) }} ({{ user.age }}y)
                </span>
              </div>
            </div>
          </td>
          <td>
            {{ user.email }}<br>
            {{ user.phone }}
          </td>
          <td>
            {{ user.address.address }}<br>
            {{ user.address.city }}, {{ user.address.stateCode }} {{ user.address.postalCode }}<br>
            {{ user.address.country }}
          </td>
          <td>
            {{ user.company.title }}<br>
            {{ user.company.name }}<br>
            {{ user.company.department }} Department
          </td>
          <td>
            <span>
              {{ capitalizeFirstLetter(user.role) }}
            </span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
