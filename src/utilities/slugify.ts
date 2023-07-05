export const slugify = (text: string): string =>{
    return text
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '') // Remove non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, '') // Remove hyphens from the beginning
      .replace(/-+$/, ''); // Remove hyphens from the end
  }
  