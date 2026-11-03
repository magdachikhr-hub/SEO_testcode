export default function objectToFormData(
  obj: Record<string, any>,
  form: FormData = new FormData(),
  namespace: string = ""
): FormData {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const formKey = namespace ? `${namespace}[${key}]` : key;
      if (value instanceof File) {
        form.append(formKey, value);
      } else if (value instanceof Date) {
        form.append(formKey, value.toISOString());
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayKey = `${formKey}[${index}]`;
          if (item instanceof File) {
            form.append(arrayKey, item);
          } else if (typeof item === "object" && item !== null) {
            objectToFormData(item, form, arrayKey);
          } else {
            form.append(arrayKey, String(item));
          }
        });
      } else if (typeof value === "object" && value !== null) {
        objectToFormData(value, form, formKey);
      } else {
        form.append(formKey, String(value));
      }
    }
  }
  return form;
}
