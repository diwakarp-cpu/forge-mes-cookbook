import { Text } from "@fynd-design-engineering/fynd-one-ds";
import styles from "../_components/cookbook.module.css";

export default function ForgeCookbookLoading() {
  return (
    <article className={styles.loadingPanel} aria-live="polite" aria-busy="true">
      <Text variant="body-m" as="p" color="secondary">
        Loading guide…
      </Text>
      <div className={styles.loadingTitle} aria-hidden />
      <div className={styles.loadingLine} aria-hidden />
      <div className={styles.loadingLineShort} aria-hidden />
    </article>
  );
}
