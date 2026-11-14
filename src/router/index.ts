import { createRouter, createWebHistory } from "vue-router";
import ContactBook from "@/view/ContactBook.vue"
import ContactAdd from '@/view/ContactAdd.vue'
import NotFound from '@/view/NotFound.vue'

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  { path: '/contacts/add', name: 'contact.add', component: ContactAdd },
  {
    path: '/contacts/:id',
    name: 'contact.edit',
    component: () => import('@/view/ContactEdit.vue'),
    props: true,
  },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
