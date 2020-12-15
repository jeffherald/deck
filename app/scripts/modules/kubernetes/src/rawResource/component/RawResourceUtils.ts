export class RawResourceUtils {
  static namespaceDisplayName(ns: string): string {
    if (ns === null || ns == '') {
      return '(global)';
    }
    return ns;
  }
}
