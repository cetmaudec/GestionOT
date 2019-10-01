import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Table, Ul, Toc, Txt, Img} from 'pdfmake-wrapper';

@Component({
  selector: 'app-ficha-ind',
  templateUrl: './ficha-ind.component.html',
  styleUrls: ['./ficha-ind.component.scss']
})
export class FichaIndComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public generateReport(): void{
    const pdf: PdfMakeWrapper = new PdfMakeWrapper();
    pdf.defaultStyle({
    bold: false,
    fontSize: 12
    });

    pdf.pageSize('letter');
    pdf.pageMargins([ 60, 60, 80, 80 ]);
    //pdf.header(new Img(logo_rozto));
    pdf.info({
        title: 'A document',
        author: 'pdfmake-wrapper',
        subject: 'subject of document',
    });
    pdf.add(new Txt('CodCliente').opacity(.2).margin([0,0,0,0]).alignment('right').end);
    pdf.add(new Toc(new Txt('Ficha de trabajo').bold().end).alignment('center').bold().textStyle({fontSize: 20}).end);
    pdf.add(new Img('../assets/img/rozto-logo.png').build());
    pdf.add(new Img('rozto-logo.png').build());
    pdf.add(pdf.ln(2));
    pdf.add(new Table([
      [new Ul(['Orden de Trabajo: KTM 1290','Nombre de cliente: Hernán Rodriguez','Motocicleta: KTM 1290','Tipo de trabajo: Parrilla']).type('square').end,
    new Ul(['Fecha de Inicio: 12-07-2019','Fecha de Entrega: 12-08-2019','Prioridad: 3ra']).type('square').end]
  ]).widths([ 250, 250 ]).layout('noBorders').end);
    pdf.add(pdf.ln(3));
    pdf.add(new Table([
      [new Txt('#').bold().alignment('center').end, new Txt('Actividad').bold().alignment('center').end, new Txt('Observación').bold().alignment('center').end],
      ['1','Desarmar partes de moto','\n\n'],
      ['2','Dimensionar tubos','\n\n'],
      ['3','Dimensionar pletinas','\n\n'],
      ['4','Perforar y redondear pletinas','\n\n'],
      ['5','Curvar tubos','\n\n'],
      ['6','Aplastar y perforar tubos','\n\n'],
      ['7','Cortar y perforar placa parrilla','\n\n'],
      ['8','Soldar estructura','\n\n'],
      ['9','Pulir soldadura','\n\n'],
      ['10','Probar estructura en la moto','\n\n'],
      ['11','Enviar a electropintar','\n\n'],
      ['12','Instalar producto en la moto','\n\n'],
      ['13','Embalar producto para despacho','No aplica'],
      ['14','Limpiar moto y entregar','\n\n']
    ]).widths([25,200,200]).alignment('center').end);


    pdf.footer('This is a footer');
    pdf.create().open();
  }
}
