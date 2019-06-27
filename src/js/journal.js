export function JournalEntry(title, entry) {
  this.entry = entry;
  this.title = title;
  this.consonants = "zxcvbnmqwrtypsdfghjkl".split("");
  this.vowels = "oiuea".split("");
  this.numbers = "1234567890".split("");
  this.datetime;
}


JournalEntry.prototype.TypeCount = function(criteria) {
  var vowct = 0;
  var conct = 0;
  var numct = 0;

  for (var checkit = 0; checkit < this.entry.split('').length; checkit++) {
    var curcheck = this.entry[checkit];

    this.vowels.forEach(function(vow) {
      if (curcheck == vow) {
        vowct++;
      }
    });
    this.consonants.forEach(function(cons) {
      if (curcheck == cons) {
        conct++;
      }
    });
    this.numbers.forEach(function(num) {
      if (curcheck == num) {
        numct++;
      }
    });
  }

  var checkstring = "Words:" + this.entry.split(' ').length;
  checkstring += "<br>Vowels: " + vowct;
  checkstring += "<br>consonants: " + conct;
  checkstring += "<br>Numbers:" + numct;
  return checkstring;
};

export function Journal(entries) {
  this.entries = entries;
  this.currentId = 0;
}

Journal.prototype.deleteEntry = function(id) {
  for (var i = 0; i < this.entries.length; i++) {
    if (this.entries[i]) {
      if (this.entries[i].id == id) {
        delete this.entries[i];
        PrintJournal(this);
        return true;
      }
    }
  }
  PrintJournal(this);
  return false;
};
Journal.prototype.addEntry = function(jEntry) {
  jEntry.id = this.assignId();
  this.entries.push(jEntry);
  jEntry.datetime = new Date();
  PrintJournal(this);
};
Journal.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};
Journal.prototype.printer = function() {
  var printoutput = "";
  this.entries.forEach(function(curentry) {
    var summedup = curentry.title;
    for (var countup = 0; countup < 8 && countup < curentry.entry.split(' ').length; countup++) {
      summedup += curentry.entry.split(' ')[countup] + " ";

    }







    printoutput +=
      "<div class='wrapper' id='entwrap" +
      curentry.id + "'>" +
      "<div class=''>" +
      "<div class='entrybody ' id='entry" + curentry.id + "'>" +
      "<div class='titledate'>" + curentry.title + "<br>" +
      curentry.datetime +
      "</div>" +
      "<div class='row'>" +
      "<div id='gist" + curentry.id + "' class='gist'>" + summedup + "<hr> " +
      "</div>" +
      "<div class='contents ' id='contents" + curentry.id + "'>" +
      curentry.entry +
      "</div>" +
      "<div class='counts ' id='Jcounts" + curentry.id + "'>" +
      curentry.TypeCount() +
      "</div>" +
      "<br><input type='button' value='Delete' id='remover" + curentry.id + "'> " +
      "</div>" +
      "</div>";

  });
  return printoutput;
}

export function PrintJournal(journal) {
  $("#journaloutput").html("");
  console.log(journal.printer());
  $("#journaloutput").append(journal.printer());
  journal.entries.forEach(function(thisentry) {
    $("#remover" + thisentry.id).click(function() {
      journal.deleteEntry(thisentry.id);
    });
    $("#gist" + thisentry.id).click(function() {

      $("#contents" + thisentry.id).toggle();
      $("#counts" + thisentry.id).toggle();
      $("#entry" + thisentry.id).toggleClass("tiny");
    });
    $("#contents" + thisentry.id).toggle();
    $("#counts" + thisentry.id).toggle();
    $("#entry" + thisentry.id).toggleClass("tiny");
  });
  if(journal.entries.length == 0){
  $("#entamount").html("No entries yet!");
  }
  else if(journal.entries.length == 1){
  $("#entamount").html("Just one entry:");
  }
  else if(journal.entries.length > 1){
      $("#entamount").html(journal.entries.length + " entries:");
  }
}
