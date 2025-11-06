let allProjects = document.querySelector('all-best-projects'); 

gsap.fromTo(allProjects, 
  {opacity: 1, y: 0, duration: 1, ease: "power2.out", 
    scrollTrigger: {
    trigger: projectsSection,
    start: "top 80%",       
    end: "bottom 20%",
    toggleActions: "play none none none"
    }
}
);