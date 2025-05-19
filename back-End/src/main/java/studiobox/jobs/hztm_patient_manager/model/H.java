package studiobox.jobs.hztm_patient_manager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name="\"H\"")
public class H implements Serializable {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "TipZapisa")
    private String TipZapisa;

    @Column(name = "NazivUredjaja")
    private String NazivUredjaja;

    @Column(name = "Verzija")
    private String Verzija;

    @Column(name = "SerijskiBroj")
    private String SerijskiBroj;

    @Column(name = "Protokol")
    private String Protokol;

    @Column(name = "DatumVrijeme")
    private String DatumVrijeme;

    @Column(name = "IdOcitanja")
    private int IdOcitanja;

    public H(){

    }

    public H(int H, String TipZapisa, String NazivUređaja, String Verzija, String SerijskiBroj, String Protokol, String DatumVrijeme, int IdOcitanja){
        this.TipZapisa = TipZapisa;
        this.NazivUredjaja = NazivUredjaja;
        this.Verzija = Verzija;
        this.SerijskiBroj = SerijskiBroj;
        this.Protokol = Protokol;
        this.DatumVrijeme = DatumVrijeme;
        this.IdOcitanja = IdOcitanja;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTipZapisa() {
        return TipZapisa;
    }
    public void setTipZapisa(String TipZapisa) {
        this.TipZapisa = TipZapisa;
    }
    public String getNazivUredjaja() {
        return NazivUredjaja;
    }
    public void setNazivUredjaja(String NazivUredjaja) {
        this.NazivUredjaja = NazivUredjaja;
    }
    public String getVerzija() {
        return Verzija;
    }
    public void setVerzija(String Verzija) {
        this.Verzija = Verzija;
    }
    public String getSerijskiBroj() {
        return SerijskiBroj;
    }
    public void setSerijskiBroj(String SerijskiBroj) {
        this.SerijskiBroj = SerijskiBroj;
    }
    public String getProtokol() {
        return Protokol;
    }
    public void setProtokol(String Protokol) {
        this.Protokol = Protokol;
    }
    public String getDatumVrijeme() {
        return DatumVrijeme;
    }
    public void setDatumVrijeme(String DatumVrijeme) {
        this.DatumVrijeme = DatumVrijeme;
    }
    public int getIdOcitanja() {
        return IdOcitanja;
    }
    public void setIdOcitanja(int IdOcitanja) {
        this.IdOcitanja = IdOcitanja;
    }
}