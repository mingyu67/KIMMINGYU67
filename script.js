const codonTable = {
    'AUG': 'Met',
    'UUU': 'Phe', 'UUC': 'Phe',
    'UUA': 'Leu', 'UUG': 'Leu',
    'UCU': 'Ser', 'UCC': 'Ser',
    'UAU': 'Tyr', 'UAC': 'Tyr',
    'UGU': 'Cys', 'UGC': 'Cys',
    'UGG': 'Trp',
    'UAA': 'Stop', 'UAG': 'Stop', 'UGA': 'Stop',
    'GCU': 'Ala', 'GCC': 'Ala',
    'GAU': 'Asp', 'GAC': 'Asp',
  };
  
  const totalProblems = 5;
  let current = 0;
  let score = 0;
  let problems = [];
  
  function transcribe(dna) {
    return dna.replace(/A/g, 'U').replace(/T/g, 'A').replace(/C/g, 'G').replace(/G/g, 'C');
  }
  
  function translate(rna) {
    let aa = [];
    for (let i = 0; i < rna.length; i += 3) {
      const codon = rna.substring(i, i + 3);
      const amino = codonTable[codon];
      if (!amino || amino === 'Stop') break;
      aa.push(amino);
    }
    return aa.join('-');
  }
  
  function generateDNA(length = 12) {
    const bases = ['A', 'T', 'C', 'G'];
    let result = '';
    for (let i = 0; i < length; i++) {
      result += bases[Math.floor(Math.random() * bases.length)];
    }
    return result;
  }
  
  function createProblems() {
    for (let i = 0; i < totalProblems; i++) {
      const dna = generateDNA(12);
      const rna = transcribe(dna);
      problems.push({ dna, rna });
    }
  }
  
  function loadProblem() {
    const p = problems[current];
    document.getElementById('dna-seq').textContent = p.dna;
    document.getElementById('current-problem').textContent = current + 1;
    document.getElementById('rna-input').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'block';
  }
  
  function submitAnswer() {
    const input = document.getElementById('rna-input').value.trim().toUpperCase();
    const correct = problems[current].rna;
    const feedback = document.getElementById('feedback');
  
    if (input === correct) {
      feedback.textContent = '✅ 정답입니다!';
      feedback.style.color = 'green';
      score++;
    } else {
      feedback.innerHTML = `❌ 오답입니다.<br>정답: ${correct}`;
      feedback.style.color = 'red';
    }
  
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
  }
  
  function loadNextProblem() {
    current++;
    if (current < totalProblems) {
      loadProblem();
    } else {
      showSummary();
    }
  }
  
  function showSummary() {
    document.getElementById('stage').style.display = 'none';
    document.getElementById('summary').style.display = 'block';
    const msg = getFinalMessage(score);
    document.getElementById('final-score').innerHTML = `정답 ${score} / ${totalProblems}<br>${msg}`;
  }
  
  function getFinalMessage(score) {
    switch (score) {
      case 0:
        return '니 애미 따라가라';
      case 1:
        return '와 진짜 사람인거 티 좀 내지 말아라라';
      case 2:
      case 3:
        return '솔직히 알면 다 맞추고 모르면 다틀리는데 너는 뭐냐 시발 보통 개병신이 아닌데 알면서 틀려?';
      case 4:
        return '하나만 더!!!!';
      case 5:
        return '🎓 생명과학 유전 단원만 주구장창 외운 타입!';
      default:
        return '';
    }
  }
  
  createProblems();
  loadProblem();
  