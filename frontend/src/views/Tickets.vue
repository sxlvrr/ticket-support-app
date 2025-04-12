<script>
import axios from 'axios'

export default {
  data() {
    return {
      tickets: [],
    }
  },
  async created() {
    const response = await axios.get('http://localhost:8000/api/tickets/')
    this.tickets = response.data
  }
}
</script>
