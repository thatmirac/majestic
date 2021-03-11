<script context="module" lang="ts">
	export async function preload({ params, query }) {
		return this.redirect(301, "wallpapers");
	}
</script>
