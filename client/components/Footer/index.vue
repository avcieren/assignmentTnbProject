<template>
  <div class="footer">
    <md-content md-theme="selection-orange" class="md-layout md-accent footer-links">
      <span class="md-subheading footer-links-head">{{ t('footer_help') }}</span>
      <span class="md-subheading footer-links-head">{{ t('footer_contacts') }}</span>
      <span class="md-subheading footer-links-head">{{ t('footer_hiring') }}</span>
      <span class="md-subheading footer-links-head">{{ t('footer_news') }}</span>
    </md-content>
  </div>
</template>

<script>
import './style.less';
export default {
  props: {
    t: Function
  }
}
</script>
