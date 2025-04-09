declare module 'jszip' {
    interface JSZip {
      loadAsync(data: any): Promise<JSZip>;
      // Ajoutez d'autres déclarations de membres ici selon les besoins
    }
  
    const JSZip: JSZip;
    export default JSZip;
  }
  