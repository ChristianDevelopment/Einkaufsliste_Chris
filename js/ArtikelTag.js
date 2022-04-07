class ArtikelTag extends React.Component {
  render = () => {
    return (
       <div>

         {/* Funktion der Checkbox verschiebt die Artikel von der Einkaufenliste aus 
        den Gruppen in die Erledigtliste in die Gruppe wo sie hingehören mit On Change Funktion */}

         <dd><label><input type="checkbox" checked={this.props.artikel.gekauft}
                           onChange={() => this.props.checkHandler(this.props.artikel)}/>
           {this.props.artikel.gekauft ? <s>{this.props.artikel.name}</s> : this.props.artikel.name}
         </label>

           {/* On Click des Delete Buttons zum Löschen der Artikel */}

           <i onClick={() => this.props.deleteHandler(this.props.artikel.name)} className="material-icons">delete</i>


         </dd>
       </div>
    )
  }
}
